# pie-chart
This is an SVG image generates a pie chart by Javascript.

We create an SVG element and draw a pie char into it

# This function expect an object argument with the following properties:
    width, height: the size of the svg graphic, in px
    cx, cy, r: the center and randius of pie
    lx, ly: the upper left corner of the chart legend
    data: an object those property names are data label and chose property values
        are the values associated with each label 
# Note
The function return an SVG element. The caller must insert it into the document in order
to make it visible
