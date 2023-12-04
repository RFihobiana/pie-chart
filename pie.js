/* We create an SVG element and draw a pie char into it

This function expect an object argument with the following properties:
    width, height: the size of the svg graphic, in px
    cx, cy, r: the center and randius of pie
    lx, ly: the upper left corner of the chart legend
    data: an object those property names are data label and chose property values
        are the values associated with each label 

The function return an SVG element. The caller must insert it into the document in order
to make it visible
*/

function pieChart(options) {
    let {width, height, cx, cy, r, lx, ly, data} = options

    // xml namespace for svg element
    let svg = 'http://www.w3.org/2000/svg'

    // create <svg> and specify the pixel size and user coordinates
    let chart = document.createElementNS(svg, 'svg')
    chart.setAttribute('width', width)
    chart.setAttribute('height', height)
    chart.setAttribute('viewBox', `0 0 ${width} ${height}`)

    /* Define the text style we will use for the chart. If this value is leaved here,
    they can be set with CSS instead */
    chart.setAttribute('font-family', 'sans-serif')
    chart.setAttribute('font-size', '18')

    // Get the label and value as array. Add up the value so we know the pie size
    let labels = Object.keys(data),
        values = Object.values(data),
        total = values.reduce((x,y) => x+y)
    
    // Figure out the angle for all the slices. Slice i starts at angles[i]
    // and ends at angles[i+1]. The angle are mesured in radian
    let angles = [0]
    values.forEach((x, i) => angles.push(angles[i] + x/total * 2 * Math.PI))
    
    // Now loop trough the slicies of the pie
    values.forEach((value, i) => {
        /* Compute the two points where our slice intersects the circle.
        These formula are choosen so that an angle of 0 at 12 o'clock and 
        positive angle increase clockwise */
        let x1 = cx + r * Math.sin(angles[i]),
            y1 = cy - r * Math.cos(angles[i]),
            x2 = cx + r * Math.sin(angles[i+1]),
            y2 = cy - r * Math.cos(angles[i+1])
        // This is a big flag for angles larger than a half circle 
        // It is required by svg arc drawing component
        let big = (angles[i+1] - angles[i] > Math.PI) ? 1 : 0

        // This string describes how to draw a slice of the pie chart 
        let path = `M${cx}, ${cy}` +      // Moves to circle center
                    `L${x1}, ${y1}` +     // Draw line to (x1,y1)
                    `A${r}, ${r} 0 ${big} 1` +    // Draw an arc of radius r
                    `${x2}, ${y2}` +       // ending at (x2, y2)
                    'Z'                   // Close path back to (cx, cy)
                    
        /* Compute the CSS color for this slice.
        This formula work for about 15 colors. So don't include more than 15 slices in a chart  */
        let color = `hsl(${(i * 40)%360},${90-3*i}%,${50+2*i}%)`

        // We describe a slice with a <path> element. Note: createElementNS()
        let slice = document.createElementNS(svg, 'path')

        // Now set attributes on the <path>
        slice.setAttribute('d', path)
        slice.setAttribute('fill', color)
        slice.setAttribute('stroke', 'black')
        slice.setAttribute('stroke-width', '1')
        chart.append(slice)

        // Now draw a little matching square for the key
        let icon = document.createElementNS(svg, 'rect')
        icon.setAttribute('x', lx)          // Position of the square
        icon.setAttribute('y', ly + 30*i)
        icon.setAttribute('width', '20')    // Size the square
        icon.setAttribute('height', '20')
        icon.setAttribute('fill', color)
        icon.setAttribute('stroke', 'black')
        icon.setAttribute('stroke-width', '1')
        chart.append(icon)

        // Add a label to the right of the rectangle
        let label = document.createElementNS(svg, 'text')
        label.setAttribute('x', lx + 30)
        label.setAttribute('y', ly + 30*i + 16)
        label.append(`${labels[i]} ${value}`)   // Add a text to label
        chart.append(label)
    })
    return chart
}
