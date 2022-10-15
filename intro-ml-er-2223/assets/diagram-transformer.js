var DiagramTransformer = {
  transform: function(code) {
    var statements = code.split("\n");
    var itemsInCode = "";
    var maxX = -Number.MAX_VALUE;
    var maxY = -Number.MAX_VALUE;
    for (var i = 0; i < statements.length; i++) {
      var statement = statements[i].trim();
      if (statement) {
        var result = eval("this.shapes." + statement);
        if (!result.outCode) {
          itemsInCode += result.code;
          maxX = Math.max(result.maxX, maxX);
          maxY = Math.max(result.maxY, maxY);
        }
      }
    }
    var itemsOutCode = "";
    for (var i = 0; i < statements.length; i++) {
      var statement = statements[i].trim();
      if (statement) {
        var result = eval("this.shapes." + statement);
        if (result.outCode) {
          itemsOutCode += result.code;
        }
      }
    }
    var processedCode = "";
    processedCode += '<span class="diagram-container">';
    processedCode +=
      '<svg width="' + (maxX + 2*this.shapes.constants.padding) + '" height="' + (maxY+2*this.shapes.constants.padding) + '" role="img">';
    processedCode +=
      '<g transform="translate(' + this.shapes.constants.padding +
      "," + this.shapes.constants.padding +
      ')">';
    processedCode += itemsInCode;
    processedCode += "</g>";
    processedCode += "</svg>";
    processedCode += itemsOutCode;
    processedCode += "</span>";
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
      padding: 10,
      charHeight: 20,
      charWidth: 12.5,
      refRadius: 10,
      linkHeadSize: 10,
      linkMarkerSize: 5
    },
    circle: function(x, y, label, className) {
      className = className ? className : "";
      var code = "";
      code +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="' +
        this.constants.refRadius +
        '" class="circle ' +
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
    rect: function(x, y, w, h, typeLabel, contentLabel, className) {
      className = className ? className : "";
      typeLabel = typeLabel ? typeLabel : "";
      contentLabel = contentLabel ? contentLabel : "";
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
        '" class="rect ' +
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
      code += "<g>";
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
      if (coords[coords.length - 1] == ">") {
        code +=
          '<g transform="rotate(' +
          (Math.atan2(
            coords[coords.length - 2] - coords[coords.length - 4],
            coords[coords.length - 3] - coords[coords.length - 5]
          ) /
            Math.PI) *
            180 +
          " " +
          coords[coords.length - 3] +
          "," +
          coords[coords.length - 2] +
          ')">';
        code +=
          '<path d="' +
          "M " +
          coords[coords.length - 3] +
          "," +
          coords[coords.length - 2] +
          " " +
          "l " +
          -this.constants.linkHeadSize +
          "," +
          -this.constants.linkHeadSize / 2 +
          " " +
          "l 0," +
          this.constants.linkHeadSize +
          " " +
          'z" class="link head ' +
          className +
          '"/>';
        code += "</g>";
      }
      code += "</g>";
      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        code: code
      };
    },
    otext: function(x, y, text, className) {
      className = className ? className : "";
      var code = "";
      if (text) {
        code +=
          '<span style="top: ' + (y+this.constants.padding) + 'px; left: ' + (x+this.constants.padding) + 'px;"' +
          ' class="textLabel outer ' + className + '">' +
          text +
          "</span>";
        console.log(text);
      }
      return {
        code: code,
        outCode: true
      };
    }
  }
};

window.diagramTransformer = DiagramTransformer;
