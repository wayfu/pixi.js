/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.PaletteFilter = function(paletteTexture, paletteWidth)
{
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        palette: { type: 'sampler2D', value: paletteTexture },
        width: { type: '1f', value: paletteWidth },
        widthInv: { type: '1f', value: 1 / paletteWidth }
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform sampler2D palette;',
        'uniform float width;',
        'uniform float widthInv;',

        'void main() {',
        '   float index = texture2D(uSampler, vTextureCoord).r * 255.0;', //Red holds index into palette
        '   vec2 coord = vec2(', //convert index into coords in palette texture
        '       mod(index, width) * widthInv,',
        '       (index / width) * widthInv',
        '   );',
        '   gl_FragColor = texture2D(palette, coord);', //Read color from palette and output
        '}'
    ];
};

PIXI.PaletteFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.PaletteFilter.prototype.constructor = PIXI.PaletteFilter;

Object.defineProperty(PIXI.PaletteFilter.prototype, 'palette', {
    get: function() {
        return this.uniforms.palette.value;
    },
    set: function(value) {
        this.uniforms.palette.value = value;
    }
});

Object.defineProperty(PIXI.PaletteFilter.prototype, 'width', {
    get: function() {
        return this.uniforms.width.value;
    },
    set: function(value) {
        this.uniforms.width.value = value;
        this.uniforms.widthInv.value = 1 / value;
    }
});
