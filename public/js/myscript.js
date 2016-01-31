$.ajax({
    url: '/datacount',
    type: 'GET',
    success: function (result) {
        var record = result;
        var currentPage = 0;
        var DataPerPage = 2;
        var NumberOfPages  = Math.ceil( record / DataPerPage);

        getdata( DataPerPage , currentPage );

        $('table.myTable').each(function() { //เรียก class

            var $table = $(this);
            $table.trigger('createPaging');
            var $pager = $('<div class="pager" align="center" ></div>');

            for (var page = 0; page < NumberOfPages; page++) {
                $('<span class="page-number"></span>').text(page + 1).bind('click', {
                    Page: page
                },  function(event) {
                        currentPage = event.data['Page'];
                        getdata( DataPerPage , currentPage );
                        $table.trigger('createPaging');
                        $(this).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
            }
            $pager.insertAfter($table).find('span.page-number:first').addClass('active');
        });//end table.myTable
    }// datacount success
});//end datacount

function getdata( DataPerPage,currentPage ){
    $.ajax({
        url: '/data',
        type: 'GET',
        data: { 'dpp' : DataPerPage , 'cp' : currentPage },
        success: function (result) {
            printdata(result);
        }//senddata success
    });//end senddata
}

function printdata( data ){
    $("#myTable tbody").remove();
    var last;
    var body = '<tbody>';
    $.each(data, function(key, val) {
        body += '<tr><td align="center" width="100" title="App name is '+val.appname+' ">' + val.appname +'</td><td align="center" width="150" title="Key is '+val.key+'">'+ val.key +'</td><td align="center" width="100" title="Value is '+val.value+'">'+ val.value +'</td></tr>';
        last = val.appname;
    });
    //alert(last);
    body += '</tbody>';
    $("#myTable").append(body);

    $.ajax({
        url: '/getlast',
        type: 'GET',
        data: { 'last' : last },
        success: function (result) {
            alert('success');
        }//senddata success
    });//end senddata

}//end printdata
