function searchMovies(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType : 'json',
        data : {
            'apikey' : 'f7860126',
            's' : $('#search-input').val()
        },
        success : function(result){
            if (result.Response == "True"){
                let movie = result.Search ;
                $.each(movie,function(i , data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="`+ data.Poster +`" class="card-img-top" >
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <h5 class="card-title">`+ data.Year +`</h5>
                                <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID+`">See Detail</a>
                                </div>
                        </div>
                    </div>
                    `);
                });
                $('#search-input').val('');

            }else{
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">`+ result.Error+`</h1>
                </div>
                `)
            }
        }
    });
}

$('#search-button').on('click',function(){
    searchMovies();
});


$('#search-input').on('keyup', function (e) {
    if(e.which === 13){
        searchMovies();
    }
});


$('#movie-list').on('click','.see-detail', function (){
    $.ajax({
        url : 'http://omdbapi.com',
        dataType : 'json',
        type : 'get',
        data : {
            'apikey' : 'f7860126',
            'i' : $(this).data('id')
        },
        success : function (movie){
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class ="container-fluid">
                        <div class ="row">
                            <div class ="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class = "col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"> <h3>`+ movie.Title +` </h3></li>
                                    <li class="list-group-item"> Released : `+ movie.Release +` </li>
                                    <li class="list-group-item"> Genre : `+ movie.Genre +` </li>
                                    <li class="list-group-item"> Director : `+ movie.Director +` </li>
                                    <li class="list-group-item"> Actors : `+ movie.Actors +` </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});