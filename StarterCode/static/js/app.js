// Get the endpoint
// Fetch the JSON data and console log it
url = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")

url.then(function(dataThing) {
    console.log('the data: ');
    console.log(dataThing);

});




function optionChanged(testSubject) {
    //replace display with selected value
    console.log(testSubject)
    let newValues = [];
    let newLabels = [];
    let newTooltips = [];
    let displaySize = 10;

    url.then(function(data2) {
        //find the new selection in the data
        subjectNumb = data2.names.findIndex((element) => element == testSubject);
        console.log(subjectNumb);

        for (let i = 0; i < displaySize; i++) {
            newValues[i] = data2.samples[subjectNumb].sample_values[i];
            newLabels[i] = "OTU " + data2.samples[subjectNumb].otu_ids[i];
            newTooltips[i] = data2.samples[subjectNumb].otu_labels[i];
        }
        // Trace for the Data
        let trace2 = {
            x: newValues.reverse(),
            y: newLabels.reverse(),
            text: newTooltips.reverse(),
            type: "bar",
            orientation: 'h'
        };

        // Data trace array
        let traceData = [trace2];

        // Apply title to the layout
        let layout = {
            title: "Test Subject " + testSubject.toString()
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", traceData, layout);

        //instantiate the metadata
        let metadata = data2.metadata[subjectNumb];
        console.log(metadata);
        let keys = Object.keys(metadata);

        // start building the metadata html to display in the infobox
        let metaText = "Test Subject " + testSubject + "<hr>";
        //loop through the keys and insert the relevant text into the metadata
        for (i = 0; i < keys.length; i++) {
            metaText = metaText + keys[i] + ": " + metadata[keys[i]] + "<br>";
        }
        // replace the contents of the infobox with the new metadata html string
        d3.select('#sample-metadata').html(metaText);


        

        //new bubble chart

        // repeat for loop but this time using ALL of the data (not just top ten)
        for (let i = 0; i < data2.samples[subjectNumb].sample_values.length; i++) {
            newValues[i] = data2.samples[subjectNumb].sample_values[i];
            newLabels[i] = data2.samples[subjectNumb].otu_ids[i];
            newTooltips[i] = data2.samples[subjectNumb].otu_labels[i]
        };
        var trace3 = {
            x: newLabels,
            y: newValues,
            text: newTooltips,
            mode: 'markers',
            marker: {
                color: newLabels,
                size: newValues
            }
        };
        data = [trace3];
        layout = {
            title: 'to be added',
            showlegend: false,
            height: 500,
            width: 1300
        };
        Plotly.newPlot('bubble', data, layout);
    });

}


// Display the default plot
function init() {

    url.then(function(data2) {
        let defaultTestSubject = data2.samples[0].id;


        // Use D3 to select the dropdown and add options to it;
        let dropDown = d3.select("#selDataset");
        var options = dropDown.selectAll("option")
            .data(data2.names)
            .enter()
            .append("option");

        options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });


        optionChanged(defaultTestSubject)

    });
}

init();