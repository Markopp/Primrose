/* global THREE, Primrose, isMobile, pliny */

pliny.issue( "", {
  name: "document InsideSphereGeometry",
  type: "open",
  description: "Finish writing the documentation for the [`InsideSphereGeometry`](#InsideSphereGeometry) class\n\
in the helpers/graphics.js file."
} );
function InsideSphereGeometry ( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {
  "use strict";

  THREE.Geometry.call( this );

  this.type = 'InsideSphereGeometry';

  this.parameters = {
    radius: radius,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    phiStart: phiStart,
    phiLength: phiLength,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };

  radius = radius || 50;

  widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
  heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

  phiStart = phiStart !== undefined ? phiStart : 0;
  phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

  thetaStart = thetaStart !== undefined ? thetaStart : 0;
  thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

  var x,
      y,
      vertices = [ ],
      uvs = [ ];

  for ( y = 0; y <= heightSegments; y++ ) {

    var verticesRow = [ ];
    var uvsRow = [ ];

    for ( x = widthSegments; x >= 0; x-- ) {

      var u = x / widthSegments;

      var v = y / heightSegments;

      var vertex = new THREE.Vector3();
      vertex.x = -radius * Math.cos( phiStart + u * phiLength ) * Math.sin(
          thetaStart + v * thetaLength );
      vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
      vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin(
          thetaStart + v * thetaLength );

      this.vertices.push( vertex );

      verticesRow.push( this.vertices.length - 1 );
      uvsRow.push( new THREE.Vector2( 1 - u, 1 - v ) );

    }

    vertices.push( verticesRow );
    uvs.push( uvsRow );

  }

  for ( y = 0; y < heightSegments; y++ ) {

    for ( x = 0; x < widthSegments; x++ ) {

      var v1 = vertices[ y ][ x + 1 ];
      var v2 = vertices[ y ][ x ];
      var v3 = vertices[ y + 1 ][ x ];
      var v4 = vertices[ y + 1 ][ x + 1 ];

      var n1 = this.vertices[ v1 ].clone()
          .normalize();
      var n2 = this.vertices[ v2 ].clone()
          .normalize();
      var n3 = this.vertices[ v3 ].clone()
          .normalize();
      var n4 = this.vertices[ v4 ].clone()
          .normalize();

      var uv1 = uvs[ y ][ x + 1 ].clone();
      var uv2 = uvs[ y ][ x ].clone();
      var uv3 = uvs[ y + 1 ][ x ].clone();
      var uv4 = uvs[ y + 1 ][ x + 1 ].clone();

      if ( Math.abs( this.vertices[ v1 ].y ) === radius ) {

        uv1.x = ( uv1.x + uv2.x ) / 2;
        this.faces.push( new THREE.Face3( v1, v3, v4, [ n1, n3, n4 ] ) );
        this.faceVertexUvs[ 0 ].push( [ uv1, uv3, uv4 ] );

      }
      else if ( Math.abs( this.vertices[ v3 ].y ) === radius ) {

        uv3.x = ( uv3.x + uv4.x ) / 2;
        this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
        this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

      }
      else {

        this.faces.push( new THREE.Face3( v1, v2, v4, [ n1, n2, n4 ] ) );
        this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv4 ] );

        this.faces.push( new THREE.Face3( v2, v3, v4, [ n2.clone(), n3,
          n4.clone() ] ) );
        this.faceVertexUvs[ 0 ].push( [ uv2.clone(), uv3, uv4.clone() ] );

      }

    }

  }

  this.computeFaceNormals();

  for ( var i = 0; i < this.faces.length; ++i ) {
    var f = this.faces[i];
    f.normal.multiplyScalar( -1 );
    for ( var j = 0; j < f.vertexNormals.length; ++j ) {
      f.vertexNormals[j].multiplyScalar( -1 );
    }
  }

  this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

}
if ( typeof window.THREE !== "undefined" ) {

  InsideSphereGeometry.prototype = Object.create( THREE.Geometry.prototype );
  InsideSphereGeometry.prototype.constructor = InsideSphereGeometry;
}

pliny.issue( "", {
  name: "document axis",
  type: "open",
  description: "Finish writing the documentation for the [`axis`](#axis) function\n\
in the helpers/graphics.js file."
} );
function axis ( length, width ) {
  var center = hub();
  put( brick( 0xff0000, length, width, width ) )
      .on( center );
  put( brick( 0x00ff00, width, width, length ) )
      .on( center );
  put( brick( 0x0000ff, width, length, width ) )
      .on( center );
  return center;
}

pliny.issue( "", {
  name: "document box",
  type: "open",
  description: "Finish writing the documentation for the [`box`](#box) function\n\
in the helpers/graphics.js file."
} );
function box ( w, h, l ) {
  if ( h === undefined ) {
    h = w;
    l = w;
  }
  return new THREE.BoxGeometry( w, h, l );
}

pliny.issue( "", {
  name: "document light",
  type: "open",
  description: "Finish writing the documentation for the [`light`](#light) function\n\
in the helpers/graphics.js file."
} );
function light ( color, intensity, distance, decay ) {
  return new THREE.PointLight( color, intensity, distance, decay );
}

pliny.issue( "", {
  name: "document v3",
  type: "open",
  description: "Finish writing the documentation for the [`v3`](#v3) function\n\
in the helpers/graphics.js file."
} );
function v3 ( x, y, z ) {
  return new THREE.Vector3( x, y, z );
}

pliny.issue( "", {
  name: "document quad",
  type: "open",
  description: "Finish writing the documentation for the [`quad`](#quad) function\n\
in the helpers/graphics.js file."
} );
function quad ( w, h, s, t ) {
  if ( h === undefined ) {
    h = w;
  }
  return new THREE.PlaneBufferGeometry( w, h, s, t );
}

pliny.issue( "", {
  name: "document hub",
  type: "open",
  description: "Finish writing the documentation for the [`hub`](#hub) function\n\
in the helpers/graphics.js file."
} );
function hub ( ) {
  return new THREE.Object3D( );
}

pliny.issue( "", {
  name: "document brick",
  type: "open",
  description: "Finish writing the documentation for the [`brick`](#brick) function\n\
in the helpers/graphics.js file."
} );
function brick ( txt, w, h, l ) {
  return textured( box( w || 1, h || 1, l || 1 ), txt, false, 1, w, l );
}

pliny.issue( "", {
  name: "document put",
  type: "open",
  description: "Finish writing the documentation for the [`put`](#put) function\n\
in the helpers/graphics.js file."
} );
function put ( object ) {
  return {
    on: function ( s ) {
      s.add( object );
      return {
        at: function ( x, y, z ) {
          object.position.set( x, y, z );
          return object;
        }
      };
    }
  };
}

pliny.issue( "", {
  name: "document fill",
  type: "open",
  description: "Finish writing the documentation for the [`fill`](#fill) function\n\
in the helpers/graphics.js file."
} );
function fill ( txt, w, h, l ) {
  if ( h === undefined ) {
    h = 1;
    if ( l === undefined ) {
      l = 1;
      if ( w === undefined ) {
        w = 1;
      }
    }
  }
  var point = hub();
  put( brick( txt, w, h, l ) )
      .on( point )
      .at( w / 2, h / 2, l / 2 );
  return point;
}

pliny.issue( "", {
  name: "document textured",
  type: "open",
  description: "Finish writing the documentation for the [`textured`](#textured) function\n\
in the helpers/graphics.js file."
} );
function textured ( geometry, txt, unshaded, o, s, t ) {
  var material;
  if ( o === undefined ) {
    o = 1;
  }

  if ( typeof txt === "number" ) {
    if ( unshaded ) {
      material = new THREE.MeshBasicMaterial( {
        transparent: true,
        color: txt,
        opacity: o,
        shading: THREE.FlatShading
      } );
    }
    else {
      material = new THREE.MeshLambertMaterial( {
        transparent: true,
        color: txt,
        opacity: o
      } );
    }
  }
  else {
    var texture;
    if ( typeof txt === "string" ) {
      texture = THREE.ImageUtils.loadTexture( txt );
    }
    else if ( txt instanceof Primrose.Text.Controls.TextBox ) {
      texture = txt.renderer.texture;
    }
    else {
      texture = txt;
    }

    if ( unshaded ) {
      material = new THREE.MeshBasicMaterial( {
        color: 0xffffff,
        map: texture,
        transparent: true,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        opacity: o
      } );
    }
    else {
      material = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: o
      } );
    }

    if ( s * t > 1 ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( s, t );
    }
  }

  var obj = null;
  if ( geometry.type.indexOf( "Geometry" ) > -1 ) {
    obj = new THREE.Mesh( geometry, material );
  }
  else if ( geometry instanceof THREE.Object3D ) {
    geometry.material = material;
    obj = geometry;
  }

  return obj;
}

pliny.issue( "", {
  name: "document sphere",
  type: "open",
  description: "Finish writing the documentation for the [`sphere`](#sphere) function\n\
in the helpers/graphics.js file."
} );
function sphere ( r, slices, rings ) {
  return new THREE.SphereBufferGeometry( r, slices, rings );
}

pliny.issue( "", {
  name: "document cylinder",
  type: "open",
  description: "Finish writing the documentation for the [`cylinder`](#cylinder) function\n\
in the helpers/graphics.js file."
} );
function cylinder ( rT, rB, height, rS, hS, openEnded, thetaStart, thetaEnd ) {
  return new THREE.CylinderGeometry( rT, rB, height, rS, hS, openEnded, thetaStart, thetaEnd );
}

pliny.issue( "", {
  name: "document shell",
  type: "open",
  description: "Finish writing the documentation for the [`shell`](#shell) function\n\
in the helpers/graphics.js file."
} );
function shell ( r, slices, rings, phi, theta ) {
  var SLICE = 0.45;
  if ( phi === undefined ) {
    phi = Math.PI * SLICE;
  }
  if ( theta === undefined ) {
    theta = Math.PI * SLICE;
  }
  var phiStart = 1.5 * Math.PI - phi * 0.5,
      thetaStart = ( Math.PI - theta ) * 0.5,
      geom = new InsideSphereGeometry( r, slices, rings, phiStart, phi,
          thetaStart, theta, true );
  return geom;
}

pliny.issue( "", {
  name: "document range",
  type: "open",
  description: "Finish writing the documentation for the [`range`](#range) function\n\
in the helpers/graphics.js file."
} );
function range ( n, m, s, t ) {
  var n2 = s && n || 0,
      m2 = s && m || n,
      s2 = t && s || 1,
      t2 = t || s || m;
  for ( var i = n2; i < m2; i += s2 ) {
    t2( i );
  }
}

pliny.issue( "", {
  name: "document cloud",
  type: "open",
  description: "Finish writing the documentation for the [`cloud`](#cloud) function\n\
in the helpers/graphics.js file."
} );
function cloud ( verts, c, s ) {
  var geom = new THREE.Geometry();
  for ( var i = 0; i < verts.length; ++i ) {
    geom.vertices.push( verts[i] );
  }
  var mat = new THREE.PointCloudMaterial( {color: c, size: s} );
  return new THREE.PointCloud( geom, mat );
}

pliny.issue( "", {
  name: "document helpers/graphics",
  type: "open",
  description: "Finish writing the documentation for the [graphics](#graphics) class in the helpers/ directory"
} );
