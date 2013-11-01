/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.PixelateFilter = function()
{
	PIXI.AbstractFilter.call( this );

	this.passes = [this];
	
	// set the uniforms
	this.uniforms = {
		invert: {type: 'f', value: 0},
		dimensions: {type: 'f4', value:new Float32Array([10000, 100, 10, 10])},
		pixelSize: {type: 'f2', value:{x:10, y:10}},
	};

	this.fragmentSrc = [
	  "precision mediump float;",
	  "varying vec2 vTextureCoord;",
	  "varying float vColor;",
	  "uniform vec2 testDim;",
	  "uniform vec4 dimensions;",
	  "uniform vec2 pixelSize;",
	  "uniform sampler2D uSampler;",
	  "void main(void) {",
	 	"vec2 coord = vTextureCoord;",

	 //	"vec2 dim = testDim;",
	 	"vec2 size = dimensions.xy/pixelSize;",

	 	"vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;",
	// 	"color += (mod(dimensions.xy, size)/dimensions.zw;",
	    "gl_FragColor = texture2D(uSampler, color);",
	  "}"
	];
	

}

PIXI.PixelateFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.PixelateFilter.prototype.constructor = PIXI.PixelateFilter;

Object.defineProperty(PIXI.PixelateFilter.prototype, 'size', {
    get: function() {
        return this.uniforms.pixelSize.value;
    },
    set: function(value) {
    	this.dirty = true;
    	this.uniforms.pixelSize.value = value;
    }
});