# pie-chart
This is an SVG image generates a pie chart by Javascript.

We create an SVG element and draw a pie chart into it

# pieChart() options properties:
## width, height:
The size of the svg graphic, in px
## cx, cy, r:
the center and randius of pie
## lx, ly: 
The upper left corner of the chart legend
## data: 
An object those property names are data label and chose property values
are the values associated with each label 

# Note
The function return an SVG element. The caller must insert it into the document in order
to make it visible
