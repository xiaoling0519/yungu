{
	"presets": [
		["env", {
			"modules": false,
			"targets": {
				"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
			}
		}],
		["es2015", {
			"modules": false
		}],
		"stage-2"
	],
	"plugins": ["transform-vue-jsx", "transform-runtime", ["component", [{
		"libraryName": "mint-ui",
		"style": true
	}]]],
	"env": {
		"test": {
			"presets": ["env", "stage-2"],
			"plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"],
		}
	}
}