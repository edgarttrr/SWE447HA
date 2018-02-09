
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
             //Front face
   0.0,  0.0,  1.0,
   1.0,  0.0,  1.0,
   1.0,  1.0,  1.0,
   0.0,  1.0,  1.0,
  
  // Back face
   0.0,  0.0,  0.0,
   0.0,  1.0,  0.0,
   1.0,  1.0,  0.0,
   1.0,  0.0,  0.0,
  
  // Top face
   0.0,  1.0,  0.0,
   0.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0,  0.0,
  
  // Bottom face
   0.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
  
  // Right face
   1.0,  0.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0,  0.0,
   1.0,  0.0,  0.0,
  
  // Left face
   0.0,  0.0,  1.0,
   0.0,  0.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  1.0,
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
            //Indices 
0,  1,  2,      0,  2,  3,    // front
4,  5,  6,      4,  6,  7,    // back
8,  9,  10,     8,  10, 11,   // top
12, 13, 14,     12, 14, 15,   // bottom
16, 17, 18,     16, 18, 19,   // right
20, 21, 22,     20, 22, 23,   // left
        ])
    };
    this.indices.count = this.indices.values.length;

    const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  ];
    
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  
        const colorBuffer = gl.createBuffer();
  
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
