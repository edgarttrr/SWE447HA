var gl = null;
var cone = null; 
cone = new Cone(gl, n);

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    


    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0,  0.0,  1.0,  1.0,);

    render(cone);
    
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    render(cone);
    
}

window.onload = init;
