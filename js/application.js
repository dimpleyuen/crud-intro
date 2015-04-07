$(document).ready(function() {

//postRequest
  function postRequest(user,title,text) {
    $.ajax({
      type: 'POST',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
      data: {
        user: user, 
        title: title,
        text: text 
      },
      dataType: "json",
      success: function(response) {
        console.log(response);
      }
    });
  }

  $(document).on('click','.submit-post', function() {
    var user  = $('.user-post').val();
    var title = $('.title-post').val();
    var text  = $('.text-post').val();

    $('.user-post, .title-post, .text-post').val("");
    postRequest(user,title,text);
  })

//putRequest
  function putRequest(title,text) {
    $.ajax({
      type: 'PUT',
      url: 'http://ga-wdi-api.meteor.com/api/posts/' + $('.id-put').val(),
      data: {
        title: title,
        text: text,
      },
      dataType: 'json',
      success: function(response){
        console.log(response);
      }
    });
  }

  $(document).on('click','.submit-put', function() {
    var title = $('.title-put').val();
    var text  = $('.text-put').val();

    putRequest(title,text);
    $('.id-put, .title-put, .text-put').val("");
    $($('tbody').children()).remove();
  })

//deleteRequest
  function deleteRequest() {
    $.ajax({
        type: 'DELETE',
        url: 'http://ga-wdi-api.meteor.com/api/posts/' + $('.id-delete').val(),
        success: function(response){
            console.log(response);
        }
    });
  }

  $(document).on('click','.submit-delete', function() {
      deleteRequest();
      getRequest();
          $('.id-delete').val("");
    })

//getRequest (ALL)
  function getRequest() {
    $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
      dataType: 'json',
      success: function(response){
        console.log(response);

        for (var i = 0 ; i <= response.length-1 ; i++) {
          console.log(response[i]);
          $('tbody').append("<tr><td>" + response[i]["user"] + "</td><td>" + response[i]["title"] + "</td><td>" + response[i]["text"] + "</td><td>" + response[i]["_id"] + "</td><td><button class='inner-submit-delete btn btn-danger'>Delete</button></td></tr>");

        }
      }
    });
  }

  $(document).on('click','.get-request', function() {
    $($('tbody').children()).remove();
    getRequest();

  })

//RESET
  $(document).on('click','.reset', function() {
    $($('tbody').children()).remove();
  })

//searchByID
  function searchByID() {
    $.ajax({
        type: 'GET',
        url: 'http://ga-wdi-api.meteor.com/api/posts/' + $('.id-get').val(),
        dataType: 'json',
        success: function(response){
          console.log(response);

          $('tbody').append("<tr><td>" + response["user"] + "</td><td>" + response["title"] + "</td><td>" + response["text"] + "</td><td>" + response["_id"] + "</td><td><button class='inner-submit-delete'>Delete</button></td></tr>");

        }
    });
  }

  $(document).on('click','.submit-id-get', function() {
    $($('tbody').children()).remove();
    searchByID();
    $('.id-get').val("");
  });

//searchByName
  function searchByName() {
    $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/search/' + $('.name-get').val(),
      dataType: 'json',
      success: function(response){
        console.log(response);

        for (var i = 0 ; i <= response.length-1 ; i++) {
          console.log(response[i]);
          $('tbody').append("<tr><td>" + response[i]["user"] + "</td><td>" + response[i]["title"] + "</td><td>" + response[i]["text"] + "</td><td>" + response[i]["_id"] + "</td><td><button class='inner-submit-delete'>Delete</button></td></tr>");

        }

      }
    });
  }

  $(document).on('click','.submit-name-get', function() {
    $($('tbody').children()).remove();
    searchByName();
    $('.name-get').val("");
  });

//delete innerEntry
  function deleteInnerEntry(toBeDeleted) {
    $.ajax({
      type: 'DELETE',
      url: 'http://ga-wdi-api.meteor.com/api/posts/' + toBeDeleted,
      success: function(response){
        console.log(response);
      }
    });
  }

  $(document).on('click','.inner-submit-delete', function() {
    var toBeDeleted = $($(this).parent().siblings()[3]).text();
    deleteInnerEntry(toBeDeleted);
    // $($('tbody').children()).remove();
    // getRequest();
    // getRequest();
    })


//pills
$('.post, .put, .delete').hide();

$(document).on('click','.get-pill', function() {
  $('.post, .delete, .put').hide();
  $('.get').show();
})

$(document).on('click','.post-pill', function() {
  // $(this).attr("class", "active");
  $('.put, .get, .delete').hide();
  $('.post').show();
})

$(document).on('click','.put-pill', function() {
  // $(this).attr("class", "active");
  $('.post, .get, .delete').hide();
  $('.put').show();
})

$(document).on('click','.delete-pill', function() {
  $('.post, .get, .put').hide();
  $('.delete').show();
})


});
