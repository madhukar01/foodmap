$(document).ready(function(){
    // Disable the upload button in form for file validation
    $("#uploadButton").prop('disabled', true);

    // Load the restaurant data from json file
    loadRestaurants();

    // File upload validation File name should match
    $("#jsonFile").change(function(e) {
        var filename = e.target.files[0].name;
        if(filename != "restaurant_data.json")
        {
            $("#fileHelp").html('<font color="red">Invalid file chosen !<br>Please choose restaurant_data.json file</font>');
        }
        else
        {
            $("#uploadButton").prop('disabled', false);
            $("#fileHelp").html('<font color="green">Please click on Upload to proceed !</font>');
        }
    });
});

// Reads json file and shows restaurant names
function loadRestaurants()
{
    $.getJSON("restaurant_data.json", function(result)
    {
        var data = "";
        $.each(result, function(link, obj)
        {
            data += '<div class="col-sm-3" id="'+ link +'" onclick="showModal(\'' + link + '\');">\
                        <img src="images/food.png" class="img-circle food-icon">\
                        <div class="caption">\
                        <p>' + obj['name'] + '</p>\
                        </div>\
                    </div>'; 
        });
        $("#restaurant-details").append(data);
    });
}

// Inserts data to the modal (map, ratings etc.) based on mouseclick on restaurant name
function showModal(id)
{
    $.getJSON("restaurant_data.json", function(result)
    {
        var data = "";
        $("#modal_data").empty();
        data = '<div class="modal-header myfont">\
                        <button type="button" class="close" data-dismiss="modal">&times;</button>\
                        <h4 class="modal-title">' +result[id]['name'] + '</h4>\
                    </div>\
                    <div class="modal-body myfont">\
                        <p>Rating: '+ result[id]['rating'] +'<span class="glyphicon">&#xe006;</span></p>\
                        <p><a href="' + id + '">Click here for more info</a></p>\
                        <div id="mymap"></div><br>\
                        <p>Top Review:<br>' + result[id]['reviews'][0] + '</p>\
                    </div>\
                    <div class="modal-footer">\
                        <p> Credits: <a href="https://www.zomato.com/">Zomato</a></p>\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    </div>';
        $("#modal_data").append(data);
        var loc = result[id]['location'];
        var mapCanvas = document.getElementById("mymap");
        var myCenter = new google.maps.LatLng(loc[0], loc[1]);
        var mapOptions = {center: myCenter, zoom:15};
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE
        });
        marker.setMap(map);
        $("#myModal").modal('show');

    });
}
