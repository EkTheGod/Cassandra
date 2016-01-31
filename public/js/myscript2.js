
<script type="text/javascript">

                $(document).ready(function(){

                    $('#insert').on('submit', function(e) {

                        $.ajax({
                            url: '/get',
                            type: 'GET',
                            success: function (result) {

                                alert("success");
        
                            }// get success
                        });//end get 
                    });
                });//end insert   
</script>