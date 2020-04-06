var DiagramTransformer = {
  transform: function(code) {
    var statements = code.split("\n");
    var itemsCode = "";
    var minX = Number.MAX_VALUE;
    var maxX = -Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxY = -Number.MAX_VALUE;
    for (var i = 0; i < statements.length; i++) {
      var statement = statements[i].trim();
      if (statement) {
        var result = eval("this.shapes." + statement);
        itemsCode += result.code;
        minX = Math.min(result.minX, minX);
        maxX = Math.max(result.maxX, maxX);
        minY = Math.min(result.minY, minY);
        maxY = Math.max(result.maxY, maxY);
      }
    }
    var processedCode = "";
    processedCode +=
      '<svg width="' +
      (maxX - minX + 2 * this.shapes.constants.padding) +
      '" height="' +
      (maxY - minY + 2 * this.shapes.constants.padding) +
      '" role="img">';
    processedCode +=
      '<g transform="translate(' +
      (-minX + this.shapes.constants.padding) +
      "," +
      (-minY + this.shapes.constants.padding) +
      ')">';
    processedCode += itemsCode;
    processedCode += "</g>";
    processedCode += "</svg>";
    return processedCode;
  },
  transformAll: function(parent, className) {
    var elements = parent.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
      var code = elements[i].children[0].textContent;
      var processed = this.transform(code);
      elements[i].innerHTML = processed;
    }
  },
  shapes: {
    constants: {
      padding: 5,
      charHeight: 20,
      charWidth: 12.5,
      refRadius: 10,
      cylYRadiusRatio: 0.075,
      cursorWidth: 5,
      cursorHeight: 10,
      linkHeadSize: 5
    },
    ref: function(x, y, label, className) {
      className = className ? className : "";
      var code = "";
      code +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="' +
        this.constants.refRadius +
        '" class="ref ' +
        className +
        '"/>';
      if (label) {
        code +=
          '<text x="' +
          x +
          '" y="' +
          (y - (this.constants.charHeight / 2 + this.constants.refRadius)) +
          '" class="refLabel ' +
          className +
          '">' +
          label +
          "</text>";
      }
      return {
        minX:
          x -
          Math.max(
            (this.constants.charWidth * label.length) / 2,
            this.constants.refRadius
          ),
        maxX:
          x +
          Math.max(
            (this.constants.charWidth * label.length) / 2,
            this.constants.refRadius
          ),
        minY:
          y -
          (this.constants.charHeight / 2 + this.constants.refRadius) -
          this.constants.charHeight / 2,
        maxY: y + this.constants.refRadius,
        code: code
      };
    },
    obj: function(x, y, w, h, typeLabel, contentLabel, className) {
      className = className ? className : "";
      var code = "";
      code +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        w +
        '" height="' +
        h +
        '" class="obj ' +
        className +
        '"/>';
      if (typeLabel) {
        code +=
          '<text x="' +
          (x + w / 2) +
          '" y="' +
          (y - this.constants.charHeight / 2) +
          '" class="typeLabel ' +
          className +
          '">' +
          typeLabel +
          "</text>";
      }
      if (contentLabel) {
        code +=
          '<text x="' +
          (x + w / 2) +
          '" y="' +
          (y + 10 + this.constants.charHeight / 2) +
          '" class="contentLabel ' +
          className +
          '">' +
          contentLabel +
          "</text>";
      }
      return {
        minX:
          x +
          w / 2 -
          Math.max((this.constants.charWidth * typeLabel.length) / 2, w / 2),
        maxX:
          x +
          w / 2 +
          Math.max((this.constants.charWidth * typeLabel.length) / 2, w / 2),
        minY: y - this.constants.charHeight,
        maxY: y + h,
        code: code
      };
    },
    cyl: function(x, y, w, h, label, className) {
      className = className ? className : "";
      var code = "";
      code += "<g>";
      code +=
        '<path d="M ' +
        x +
        "," +
        y +
        " L " +
        x +
        "," +
        (y + h) +
        " A " +
        w / 2 +
        "," +
        w * this.constants.cylYRadiusRatio +
        " 0 0,0 " +
        (x + w) +
        "," +
        (y + h) +
        " L " +
        (x + w) +
        "," +
        y +
        " A " +
        w / 2 +
        "," +
        w * this.constants.cylYRadiusRatio +
        " 0 0,0 " +
        x +
        "," +
        y +
        " A " +
        w / 2 +
        "," +
        w * this.constants.cylYRadiusRatio +
        " 0 0,0 " +
        (x + w) +
        "," +
        y +
        '" class="cyl ' +
        className +
        '"/>';
      if (label) {
        code +=
          '<text x="' +
          (x + w / 2) +
          '" y="' +
          (y +
            10 +
            w * this.constants.cylYRadiusRatio +
            this.constants.charHeight / 2) +
          '" class="contentLabel ' +
          className +
          '">' +
          label +
          "</text>";
      }
      code += "</g>";
      return {
        minX: x,
        maxX: x + w,
        minY: y - w * this.constants.cylYRadiusRatio,
        maxY: y + h + w * this.constants.cylYRadiusRatio,
        code: code
      };
    },
    arrow: function(x, y, w, h, a, className) {
      className = className ? className : "";
      a = a ? a : 0;
      var code = "";
      code +=
        '<g transform="rotate(' +
        a +
        " " +
        x +
        " " +
        y +
        ')">' +
        '<path d="M ' +
        x +
        "," +
        y +
        " m " +
        -w / 4 +
        "," +
        -h / 2 +
        " l 0," +
        h / 2 +
        " l " +
        -w / 4 +
        ",0" +
        " l " +
        w / 2 +
        "," +
        h / 2 +
        " l " +
        w / 2 +
        "," +
        -h / 2 +
        " l " +
        -w / 4 +
        ",0" +
        " l 0," +
        -h / 2 +
        'z" class="arrow ' +
        className +
        '"/></g>';
      var r = Math.sqrt((w * w) / 4 + (h * h) / 4);
      return {
        minX: x - r,
        maxX: x + r,
        minY: y - r,
        maxY: y + r,
        code: code
      };
    },
    array: function(x, y, w, h, n, cursor, eos, className) {
      className = className ? className : "";
      var code = "";
      code += "<g>";
      for (var i = 0; i < n; i++) {
        code +=
          '<rect x="' +
          (x + w * i) +
          '" y="' +
          y +
          '" width="' +
          w +
          '" height="' +
          h +
          '"' +
          '" class="array ' +
          (i == eos ? "eos " : "") +
          className +
          '"/>';
      }
      if (cursor!=='') {
        code +=
          '<path d="' +
          "M " +
          (x + w * cursor - this.constants.cursorWidth / 4) +
          "," +
          (y - this.constants.cursorHeight) +
          " " +
          "l " +
          -this.constants.cursorWidth / 4 +
          ",0 " +
          "l 0," +
          this.constants.cursorHeight / 2 +
          " " +
          "l " +
          -this.constants.cursorWidth / 4 +
          ",0 " +
          "l " +
          this.constants.cursorWidth / 2 +
          "," +
          this.constants.cursorHeight / 2 +
          " " +
          "l " +
          this.constants.cursorWidth / 2 +
          "," +
          -this.constants.cursorHeight / 2 +
          " " +
          "l " +
          -this.constants.cursorWidth / 4 +
          ",0 " +
          "l 0," +
          -this.constants.cursorHeight / 2 +
          " " +
          'z" class="cursor ' +
          className +
          '"/>';
      }
      code += "</g>";
      return {
        minX: Math.min(x, (cursor!=='') ? (x + w * cursor - this.constants.cursorWidth) : x),
        maxX: Math.max(
          x + w * n,
          (cursor!=='') ? (x + w * cursor + this.constants.cursorWidth) : x
        ),
        minY: y - (cursor!=='') ? this.constants.cursorHeight : 0,
        maxY: y + h,
        code: code
      };
    },
    zone: function(x, y, w, h, label, className) {
      className = className ? className : "";
      var code = "";
      code +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        w +
        '" height="' +
        h +
        '" class="zone ' +
        className +
        '"/>';
      if (label) {
        code +=
          '<text x="' +
          (x + this.constants.charWidth) +
          '" y="' +
          (y - this.constants.charHeight / 2) +
          '" class="zoneLabel ' +
          className +
          '">' +
          label +
          "</text>";
      }
      return {
        minX: x,
        maxX: Math.max(
          x + w,
          x + this.constants.charWidth + this.constants.charWidth * label.length
        ),
        minY: y - this.constants.charHeight,
        maxY: y + h,
        code: code
      };
    },
    text: function(x, y, label, className) {
      className = className ? className : "";
      var code = "";
      if (label) {
        code +=
          '<text x="' +
          x +
          '" y="' +
          y +
          '" class="textLabel ' +
          className +
          '">' +
          label +
          "</text>";
      }
      return {
        minX: x - (this.constants.charWidth * label.length) / 2,
        maxX: x + (this.constants.charWidth * label.length) / 2,
        minY: y - this.constants.charHeight / 2,
        maxY: y + y - this.constants.charHeight / 2,
        code: code
      };
    },
    link: function(coords, className) {
      className = className ? className : "";
      var minX = Number.MAX_VALUE;
      var maxX = -Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var code = "";
      code += '<g>';
      code += '<path d="';
      for (var i = 0; i < Math.floor(coords.length / 2); i++) {
        var command = "L";
        if (i == 0) {
          command = "M";
        }
        if (!isFinite(coords[i * 2]) && coords[i * 2].startsWith("j")) {
          var lastX = parseFloat(coords[(i - 1) * 2]);
          var lastY = parseFloat(coords[(i - 1) * 2 + 1]);
          var radius = parseFloat(coords[i * 2].substring(1));
          var direction = coords[i * 2 + 1];
          if (direction == "n") {
            code +=
              "A" +
              radius +
              "," +
              radius +
              " 0 0,0 " +
              lastX +
              "," +
              (lastY - 2 * radius);
          } else if (direction == "e") {
            code +=
              "A" +
              radius +
              "," +
              radius +
              " 0 0,0 " +
              (lastX + 2 * radius) +
              "," +
              lastY;
          } else if (direction == "s") {
            code +=
              "A" +
              radius +
              "," +
              radius +
              " 0 0,0 " +
              lastX +
              "," +
              (lastY + 2 * radius);
          } else if (direction == "w") {
            code +=
              "A" +
              radius +
              "," +
              radius +
              " 0 0,0 " +
              (lastX - 2 * radius) +
              "," +
              lastY;
          }
        } else {
          var x = parseFloat(coords[i * 2]);
          var y = parseFloat(coords[i * 2 + 1]);
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          code += command + x + "," + y + " ";
        }
      }
      code += '" class="link ' + className + '"/>';
      console.log('Math.atan2('+(coords[coords.length-3]-coords[coords.length-5])+','+(coords[coords.length-2]-coords[coords.length-4])+')');
      if (coords[coords.length-1]=='>') {
        code += '<g transform="rotate('+(Math.atan(
          (coords[coords.length-3]-coords[coords.length-5])/
          (coords[coords.length-2]-coords[coords.length-4])
        )/Math.PI*180-90)+' '+coords[coords.length-3]+','+coords[coords.length-2]+')">';
        code += '<path d="'+
          'M '+coords[coords.length-3]+','+coords[coords.length-2]+' '+
          'l '+(-this.constants.linkHeadSize)+','+(-this.constants.linkHeadSize/2)+' '+
          'l 0,'+this.constants.linkHeadSize+' '+
          'z" class="link head ' + className + '"/>';
        code += '</g>';
      }
      code += '</g>';
      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        code: code
      };
    }
  }
};

window.diagramTransformer = DiagramTransformer;
