var DiagramTransformer = {
  transform: function(code) {
    var statements = code.split("\n");
    var itemsCode = "";
    var minX = Number.MAX_VALUE;
    var maxX = -Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxY = -Number.MAX_VALUE;
    for (var i = 0; i<statements.length; i++) {
      var statement = statements[i].trim();
      if (statement) {
        var result = eval("this.shapes."+statement);
        itemsCode += result.code;
        minX = Math.min(result.minX, minX);
        maxX = Math.max(result.maxX, maxX);
        minY = Math.min(result.minY, minY);
        maxY = Math.max(result.maxY, maxY);
      }
    }
    var processedCode = '';
    processedCode += '<svg width="'+(maxX-minX+2*this.shapes.constants.padding)+'" height="'+(maxY-minY+2*this.shapes.constants.padding)+'" role="img">';
    processedCode += '<g transform="translate('+(-minX+this.shapes.constants.padding)+','+(-minY+this.shapes.constants.padding)+')">';
    processedCode += itemsCode;
    processedCode += '</g>';
    processedCode += '</svg>';
    return processedCode;
  },
  transformAll: function(parent, className) {
    var elements = parent.getElementsByClassName(className);
    for (var i = 0; i<elements.length; i++) {
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
      refRadius: 10
    },
    ref: function(x, y, label, className) {
      className = className?className:'';
      var code = '';
      code += '<circle cx="'+x+'" cy="'+y+'" r="'+this.constants.refRadius+'" class="ref '+className+'"/>';
      if (label) {
        code += '<text x="'+x+'" y="'+(y-(this.constants.charHeight/2+this.constants.refRadius))+'">'+label+'</text>';
      }
      return {
        minX: x-Math.max(this.constants.charWidth*label.length/2, this.constants.refRadius),
        maxX: x+Math.max(this.constants.charWidth*label.length/2, this.constants.refRadius),
        minY: (y-(this.constants.charHeight/2+this.constants.refRadius)-this.constants.charHeight/2),
        maxY: y+this.constants.refRadius,
        code: code
      };
    },
    obj: function(x, y, w, h, typeLabel, contentLabel, className) {
      className = className?className:'';
      var code = '';
      code += '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" class="obj '+className+'"/>';
      if (typeLabel) {
        code += '<text x="'+(x+w/2)+'" y="'+(y-this.constants.charHeight/2)+'">'+typeLabel+'</text>';
      }
      if (contentLabel) {
        code += '<text x="'+(x+w/2)+'" y="'+(y+10+this.constants.charHeight/2)+'">'+contentLabel+'</text>';
      }
      return {
        minX: x+w/2-Math.max(this.constants.charWidth*typeLabel.length/2, w/2),
        maxX: x+w/2+Math.max(this.constants.charWidth*typeLabel.length/2, w/2),
        minY: (y-this.constants.charHeight),
        maxY: y+h,
        code: code
      };
    },
    link: function(coords, className) {
      className = className?className:'';
      var minX = Number.MAX_VALUE;
      var maxX = -Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var code = '';
      code += '<polyline points="';
      for (var i = 0; i<Math.floor(coords.length/2); i++) {
        var x = parseFloat(coords[i*2]);
        var y = parseFloat(coords[i*2+1]);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        code += x+','+y+" ";
      }
      code += '" class="link '+className+'"/>';
      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        code: code
      };
    }
  }
}

window.diagramTransformer = DiagramTransformer;
