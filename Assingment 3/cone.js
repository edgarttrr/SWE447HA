var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    
    attribute vec4 vPosition;

void main() 
{
     gl_Position = vPosition;
}
    
    

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0,  1.0,  0.0,  1.9,);

    render();
}
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
