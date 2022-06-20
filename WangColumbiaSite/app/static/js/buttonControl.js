function makeRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

$(document).ready(function(){

  const randomString = makeRandomString(20);
  const isolateSearchInputHandle = document.getElementById('isolateSearchInput');
  const autoCompleteHandle = new Autocomplete(isolateSearchInputHandle, {
      maximumItems: 15,
      threshold: 3
  });
  $.ajax({
    url:"./script/php/searchByIsolate_autoComplete.php",
    type: "POST",
    dataType: 'json',
    data: {file_autoComplete: "../../data/keyword_for_autoComplete.tsv"},
    success: function(response){
      autoCompleteHandle.setData(response);
      window.scrollTo(0,0);
    }
  });

  $('#isolateAllButton').on('click', function(event) {
    document.getElementById("allIsolateTableContainer").classList.remove('d-none');
    document.getElementById("searchIsolateTableContainer").classList.add('d-none');
    var searchLabel = document.getElementById('searchLabel');
    if (typeof(searchLabel) != 'undefined' && searchLabel != null){
      searchLabel.remove();
    }
    document.getElementById("isolateSearchInput").value = "";
  });

  $('#isolateSearchButton').on('click', function(event) {
    document.getElementById("allIsolateTableContainer").classList.add('d-none');
    document.getElementById("searchIsolateTableContainer").classList.remove('d-none');
    var isolateSearchInput = document.getElementById("isolateSearchInput").value;
    if (isolateSearchInput == ""){
      isolateSearchInput = "F. prausnitzii";
    }
    $.ajax({
      url:"./script/php/searchByIsolate_searchKeyword.php",
      type: "POST",
      dataType: 'json',
      data: {
        keyword: isolateSearchInput,
        isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
        isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
        isolates_WGS: "../../data/isolates_WGS.manual_update.tsv"},

      beforeSend: function(){
        var searchLabel = document.getElementById('searchLabel');
        if (typeof(searchLabel) != 'undefined' && searchLabel != null){
          searchLabel.remove();
        }
        document.getElementById("searchLabelContainer").innerHTML += '<div id="searchProgressBar" class="row col-lg-12 d-flex justify-content-center"><div class="col-lg-1 order-lg-1"></div><div class="col-lg-1 order-lg-2 spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div><div class="col-lg-2 order-lg-3"><h4> searching...</h4></div></div>';
      },
      success: function(response){
        var searchProgressBar = document.getElementById('searchProgressBar');
        searchProgressBar.remove();

        document.getElementById("searchLabelContainer").innerHTML += "<h4 id='searchLabel'>Search result for \"" + isolateSearchInput + "\": " + response.length.toString() + " isolate(s)</h4>";

        $.fn.dataTable.ext.type.order["html-num-fmt-pre"] = function(data) {
          data = data.replace(/<.*?>/g, '');
          data = data.replace(/\./g, '');
          data = data.replace(/,/g, '.');
          data = data.replace(/[^0-9\.\-]/g, '');
          if ( data === '' ) {return -Infinity;}
          return data*1;
        };
        $('#searchIsolateTable').DataTable().clear().destroy();
        $('#searchIsolateTable').DataTable({
		        serverSide: false,
						scrollX: true,
						searching: true,
						ordering: true,
            data: response,
            colReorder: true,
            dom: '<"top"lBf>t<"bottom"ip>',
            buttons: ['colvis', 'csv'],
            initComplete: function () {
                var top_container = $('.top');
                top_container.addClass("row col-lg-12");
                $('.dataTables_length').addClass('col-auto');
                $('.dataTables_length').addClass('order-lg-1');
                var buttons = $('.dt-buttons');
                buttons.addClass('col-lg-7');
                buttons.addClass('order-lg-2');
                buttons.removeClass('dt-buttons');
                $('.dataTables_filter').addClass('col-auto');
                $('.dataTables_filter').addClass('order-lg-3');
                var button_column = $('.buttons-colvis');
                button_column.addClass('btn btn-outline-dark btn-sm');
                button_column.removeClass('dt-button');
                $(".buttons-colvis span").text("Select column to show");
                var button_csv = $('.buttons-csv');
                button_csv.addClass('btn btn-outline-dark btn-sm');
                button_csv.removeClass('dt-button');
                $(".buttons-csv span").text("Export as CSV");
            },
            columnDefs: [{
              targets: 0,
              render: function (data, type, row, meta){
                if (type === 'display'){
                  data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
                }
                return data;
              }
            },
            {targets: [5, 17, 18, 19, 20, 21, 22, 23, 24], type: "html-num-fmt"}
          ],
		    });
      }
    });
    document.getElementById("isolateSearchInput").value = "";
  });

  $('#isolateWGSButton').on('click', function(event) {
    document.getElementById("allIsolateTableContainer").classList.add('d-none');
    document.getElementById("searchIsolateTableContainer").classList.remove('d-none');
    document.getElementById("isolateSearchInput").value = "";
    $.ajax({
      url:"./script/php/searchByIsolate_searchWGS.php",
      type: "POST",
      dataType: 'json',
      data: {
        isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
        isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
        isolates_WGS: "../../data/isolates_WGS.manual_update.tsv"
      },
      beforeSend: function() {
        var searchLabel = document.getElementById('searchLabel');
        if (typeof(searchLabel) != 'undefined' && searchLabel != null){
          searchLabel.remove();
        }
        document.getElementById("searchLabelContainer").innerHTML += '<div id="searchProgressBar" class="row col-lg-12 d-flex justify-content-center"><div class="col-lg-1 order-lg-1"></div><div class="col-lg-1 order-lg-2 spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div><div class="col-lg-2 order-lg-3"><h4> searching...</h4></div></div>';
      },
      success: function(response){
        var searchProgressBar = document.getElementById('searchProgressBar');
        searchProgressBar.remove();

        document.getElementById("searchLabelContainer").innerHTML += "<h4 id='searchLabel'>Search result for " + response.length.toString() + " isolate(s) with WGS</h4>";

        $.fn.dataTable.ext.type.order["html-num-fmt-pre"] = function(data) {
          data = data.replace(/<.*?>/g, '');
          data = data.replace(/\./g, '');
          data = data.replace(/,/g, '.');
          data = data.replace(/[^0-9\.\-]/g, '');
          if ( data === '' ) {return -Infinity;}
          return data*1;
        };
        $('#searchIsolateTable').DataTable().clear().destroy();
        $('#searchIsolateTable').DataTable({
		        serverSide: false,
						scrollX: true,
						searching: true,
						ordering: true,
            data: response,
            colReorder: true,
            dom: '<"top"lBf>t<"bottom"ip>',
            buttons: ['colvis', 'csv'],
            initComplete: function () {
                var top_container = $('.top');
                top_container.addClass("row col-lg-12");
                $('.dataTables_length').addClass('col-auto');
                $('.dataTables_length').addClass('order-lg-1');
                var buttons = $('.dt-buttons');
                buttons.addClass('col-lg-7');
                buttons.addClass('order-lg-2');
                buttons.removeClass('dt-buttons');
                $('.dataTables_filter').addClass('col-auto');
                $('.dataTables_filter').addClass('order-lg-3');
                var button_column = $('.buttons-colvis');
                button_column.addClass('btn btn-outline-dark btn-sm');
                button_column.removeClass('dt-button');
                $(".buttons-colvis span").text("Select column to show");
                var button_csv = $('.buttons-csv');
                button_csv.addClass('btn btn-outline-dark btn-sm');
                button_csv.removeClass('dt-button');
                $(".buttons-csv span").text("Export as CSV");
            },
            columnDefs: [{
              targets: 0,
              render: function (data, type, row, meta){
                if (type === 'display'){
                  data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
                }
                return data;
              }
            },{targets: [5, 17, 18, 19, 20, 21, 22, 23, 24], type: "html-num-fmt"}],
		    });
      }
    });
  });

  $('#isolateHQgenomeButton').on('click', function(event) {
    document.getElementById("allIsolateTableContainer").classList.add('d-none');
    document.getElementById("searchIsolateTableContainer").classList.remove('d-none');
    document.getElementById("isolateSearchInput").value = "";
    $.ajax({
      url:"./script/php/searchByIsolate_searchHQgenome.php",
      type: "POST",
      dataType: 'json',
      data: {
        isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
        isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
        isolates_WGS: "../../data/isolates_WGS.manual_update.tsv",
        isolates_HQgenome_list: "../../data/isolates_HQgenome.manual_update.tsv"},
      beforeSend: function() {
          var searchLabel = document.getElementById('searchLabel');
          if (typeof(searchLabel) != 'undefined' && searchLabel != null){
            searchLabel.remove();
          }
          document.getElementById("searchLabelContainer").innerHTML += '<div id="searchProgressBar" class="row col-lg-12 d-flex justify-content-center"><div class="col-lg-1 order-lg-1"></div><div class="col-lg-1 order-lg-2 spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div><div class="col-lg-2 order-lg-3"><h4> searching...</h4></div></div>';
      },
      success: function(response){
        var searchProgressBar = document.getElementById('searchProgressBar');
        searchProgressBar.remove();
        document.getElementById("searchLabelContainer").innerHTML += "<h4 id='searchLabel'>Search result for " + response.length.toString() + " isolate(s) with high-quality draft genome</h4>";

        $.fn.dataTable.ext.type.order["html-num-fmt-pre"] = function(data) {
          data = data.replace(/<.*?>/g, '');
          data = data.replace(/\./g, '');
          data = data.replace(/,/g, '.');
          data = data.replace(/[^0-9\.\-]/g, '');
          if ( data === '' ) {return -Infinity;}
          return data*1;
        };

        $('#searchIsolateTable').DataTable().clear().destroy();
        $('#searchIsolateTable').DataTable({
		        serverSide: false,
						scrollX: true,
						searching: true,
						ordering: true,
            data: response,
            colReorder: true,
            dom: '<"top"lBf>t<"bottom"ip>',
            buttons: ['colvis', 'csv'],
            initComplete: function () {
                var top_container = $('.top');
                top_container.addClass("row col-lg-12");
                $('.dataTables_length').addClass('col-auto');
                $('.dataTables_length').addClass('order-lg-1');
                var buttons = $('.dt-buttons');
                buttons.addClass('col-lg-7');
                buttons.addClass('order-lg-2');
                buttons.removeClass('dt-buttons');
                $('.dataTables_filter').addClass('col-auto');
                $('.dataTables_filter').addClass('order-lg-3');
                var button_column = $('.buttons-colvis');
                button_column.addClass('btn btn-outline-dark btn-sm');
                button_column.removeClass('dt-button');
                $(".buttons-colvis span").text("Select column to show");
                var button_csv = $('.buttons-csv');
                button_csv.addClass('btn btn-outline-dark btn-sm');
                button_csv.removeClass('dt-button');
                $(".buttons-csv span").text("Export as CSV");
            },
            columnDefs: [{
              targets: 0,
              render: function (data, type, row, meta){
                if (type === 'display'){
                  data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
                }
                return data;
              }
            },{targets: [5, 17, 18, 19, 20, 21, 22, 23, 24], type: "html-num-fmt"}],
		    });
      }
    });
  });

  $('#taxonomySearchResetButton').on('click', function(event) {

    var searchTaxonomyLabel = document.getElementById('searchTaxonomyLabel');
    if (typeof(searchTaxonomyLabel) != 'undefined' && searchTaxonomyLabel != null){
      searchTaxonomyLabel.remove();
    }

    $.ajax({
  		url:"./script/php/searchByTaxonomy_initialize.php",
  		type: "POST",
  		dataType: 'text',
  		data: {
  			taxonomy_list: "../../data/taxonomy.tree.tsv"
  		},
  		success: function(response){
  			substring = response.split("\t\t\t\t\t");
  			k_list = JSON.parse(substring[0]);
  			p_list = JSON.parse(substring[1]);
  			c_list = JSON.parse(substring[2]);
  			o_list = JSON.parse(substring[3]);
  			f_list = JSON.parse(substring[4]);
  			g_list = JSON.parse(substring[5]);
  			s_list = JSON.parse(substring[6]);

        document.getElementById("select_k").options.length = 0;
				document.getElementById("select_p").options.length = 0;
				document.getElementById("select_c").options.length = 0;
				document.getElementById("select_o").options.length = 0;
				document.getElementById("select_f").options.length = 0;
				document.getElementById("select_g").options.length = 0;
				document.getElementById("select_s").options.length = 0;

				var option = document.createElement("option");
				option.text = "Select Kingdom";
				option.value = "default";
				document.getElementById("select_k").add(option);
				for(var i in k_list){
					var option = document.createElement("option");
					option.text = k_list[i];
					option.value = k_list[i];
					document.getElementById("select_k").add(option);
				}
				document.getElementById("select_k").value = "default";

				var option = document.createElement("option");
				option.text = "Select Phylum";
				option.value = "default";
				document.getElementById("select_p").add(option);
				for(var i in p_list){
					var option = document.createElement("option");
					option.text = p_list[i];
					option.value = p_list[i];
					document.getElementById("select_p").add(option);
				}
				document.getElementById("select_p").value = "default";

				var option = document.createElement("option");
				option.text = "Select Class";
				option.value = "default";
				document.getElementById("select_c").add(option);
				for(var i in c_list){
					var option = document.createElement("option");
					option.text = c_list[i];
					option.value = c_list[i];
					document.getElementById("select_c").add(option);
				}
				document.getElementById("select_c").value = "default";

				var option = document.createElement("option");
				option.text = "Select Order";
				option.value = "default";
				document.getElementById("select_o").add(option);
				for(var i in o_list){
					var option = document.createElement("option");
					option.text = o_list[i];
					option.value = o_list[i];
					document.getElementById("select_o").add(option);
				}
				document.getElementById("select_o").value = "default";

				var option = document.createElement("option");
				option.text = "Select Family";
				option.value = "default";
				document.getElementById("select_f").add(option);
				for(var i in f_list){
					var option = document.createElement("option");
					option.text = f_list[i];
					option.value = f_list[i];
					document.getElementById("select_f").add(option);
				}
				document.getElementById("select_f").value = "default";

				var option = document.createElement("option");
				option.text = "Select Genus";
				option.value = "default";
				document.getElementById("select_g").add(option);
				for(var i in g_list){
					var option = document.createElement("option");
					option.text = g_list[i];
					option.value = g_list[i];
					document.getElementById("select_g").add(option);
				}
				document.getElementById("select_g").value = "default";

				var option = document.createElement("option");
				option.text = "Select Species";
				option.value = "default";
				document.getElementById("select_s").add(option);
				for(var i in s_list){
					var option = document.createElement("option");
					option.text = s_list[i];
					option.value = s_list[i];
					document.getElementById("select_s").add(option);
				}
				document.getElementById("select_s").value = "default";
			}
  	});
    $('#searchTaxonomyTable').DataTable().clear().destroy();
    $("#searchTaxonomyTable").DataTable({
      serverSide: false,
      searching: true,
      ordering: true,
      scrollX: true,
    });
    $('#searchTaxonomyWGScheck').prop('checked', false);
    $('#searchTaxonomyWGScheck').attr('disabled', false);
    $('#searchTaxonomyHQcheck').prop('checked', false);
  });

  $('#taxonomySearchSubmitButton').on('click', function(event) {
    document.getElementById("searchTaxonomy16SV4Container").classList.add('d-none');
    document.getElementById("searchTaxonomyTaxContainer").classList.remove('d-none');


    var value_k = document.getElementById("select_k").value;
    var value_p = document.getElementById("select_p").value;
    var value_c = document.getElementById("select_c").value;
    var value_o = document.getElementById("select_o").value;
    var value_f = document.getElementById("select_f").value;
    var value_g = document.getElementById("select_g").value;
    var value_s = document.getElementById("select_s").value;
    var ifWGS = "N";
    var ifHQ = "N";
    if ($('#searchTaxonomyWGScheck').prop('checked')){
      ifWGS = "Y";
    }
    if ($('#searchTaxonomyHQcheck').prop('checked')){
      ifHQ = "Y";
    }
    if (value_k != "default"){
      $.ajax({
        url:"./script/php/searchByTaxonomy_searchTax.php",
        type: "POST",
        dataType: 'text',
        data: {
          isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
          isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
          isolates_WGS: "../../data/isolates_WGS.manual_update.tsv",
          isolates_HQgenome_list: "../../data/isolates_HQgenome.manual_update.tsv",
          keyword_k: value_k,
          keyword_p: value_p,
          keyword_c: value_c,
          keyword_o: value_o,
          keyword_f: value_f,
          keyword_g: value_g,
          keyword_s: value_s,
          keyword_WGS: ifWGS,
          keyword_HQ: ifHQ},
        beforeSend: function() {
            var searchTaxonomyLabel = document.getElementById('searchTaxonomyLabel');
            if (typeof(searchTaxonomyLabel) != 'undefined' && searchTaxonomyLabel != null){
              searchTaxonomyLabel.remove();
            }
            document.getElementById("searchTaxonomyLabelContainer").innerHTML += '<div id="searchTaxonomyProgressBar" class="row col-lg-12 d-flex justify-content-center"><div class="col-lg-1 order-lg-1"></div><div class="col-lg-1 order-lg-2 spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div><div class="col-lg-2 order-lg-3"><h4> searching...</h4></div></div>';
        },
        success: function(response){
          var searchTaxonomyProgressBar = document.getElementById('searchTaxonomyProgressBar');
          searchTaxonomyProgressBar.remove();

          substring = response.split("\t\t\t\t\t");
          document.getElementById("searchTaxonomyLabelContainer").innerHTML += "<h4 id='searchTaxonomyLabel'>Search result for " + substring[0] + " isolate(s)</h4>";

          $.fn.dataTable.ext.type.order["html-num-fmt-pre"] = function(data) {
            // Strip HTML
            data = data.replace(/<.*?>/g, '');

            // Remove dots
            data = data.replace(/\./g, '');

            // Replace commas dots
            data = data.replace(/,/g, '.');

            // Strip any remaining no numeric data
            data = data.replace(/[^0-9\.\-]/g, '');

            if ( data === '' ) { // it was NA
              return -Infinity;
            }

            return data*1;
          };
          $('#searchTaxonomyTable').DataTable().clear().destroy();
          $('#searchTaxonomyTable').DataTable({
  		        serverSide: false,
  						scrollX: true,
  						searching: true,
  						ordering: true,
              colReorder: true,
              data: JSON.parse(substring[1]),
              dom: '<"top"lBf>t<"bottom"ip>',
              buttons: ['colvis', 'csv'],
              initComplete: function () {
                  var top_container = $('.top');
                  top_container.addClass("row col-lg-12");
                  $('.dataTables_length').addClass('col-auto');
                  $('.dataTables_length').addClass('order-lg-1');
                  var buttons = $('.dt-buttons');
                  buttons.addClass('col-auto');
                  buttons.addClass('order-lg-2');
                  buttons.removeClass('dt-buttons');
                  $('.dataTables_filter').addClass('col-auto');
                  $('.dataTables_filter').addClass('order-lg-3');
                  var button_column = $('.buttons-colvis');
                  button_column.addClass('btn btn-outline-dark btn-sm');
                  button_column.removeClass('dt-button');
                  $(".buttons-colvis span").text("Select column to show");
                  var button_csv = $('.buttons-csv');
                  button_csv.addClass('btn btn-outline-dark btn-sm');
                  button_csv.removeClass('dt-button');
                  $(".buttons-csv span").text("Export as CSV");
              },
              columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta){
                  if (type === 'display'){
                    data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
                  }
                  return data;
                }
              },{targets: [5, 17, 18, 19, 20, 21, 22, 23, 24], type: "html-num-fmt"}],
  		    });
        }
      });
    }
  });

  $('#searchTaxonomyHQcheck').change(function(){
    if ($('#searchTaxonomyHQcheck').prop('checked')){
      $('#searchTaxonomyWGScheck').prop('checked', true);
      $('#searchTaxonomyWGScheck').attr('disabled', true);
    }else{
      $('#searchTaxonomyWGScheck').attr('disabled', false);
    }
  });

  $('#search16SV4HQcheck').change(function(){
    if ($('#search16SV4HQcheck').prop('checked')){
      $('#search16SV4WGScheck').prop('checked', true);
      $('#search16SV4WGScheck').attr('disabled', true);
    }else{
      $('#search16SV4WGScheck').attr('disabled', false);
    }
  });

  $('#search16SV4file').change(function(){
    $('#search16SV4TypeInput').val('');
    $('#search16SV4TypeInput').attr('readonly', true);
    $('#search16SV4ExampleButton').attr('disabled', true);
  });

  $('#search16SV4ResetButton').on('click', function(event){
    $('#search16SV4file').val('');
    $('#search16SV4TypeInput').val('');
    $('#search16SV4TypeInput').attr('readonly', false);
    $('#search16SV4ExampleButton').attr('disabled', false);
  });

  $('#search16SV4ExampleButton').on('click', function(event){
    $('#search16SV4TypeInput').val('TACGTAGGGAGCGAGCGTTATCCGGATTCATTGGGCGTAAAGAGCGCGTAGGCGGCCTCTCAAGCGGGATCTCTAATCCGAGGGCTCAACCCCCGGCCGGATCCCGAACTGGGAGGCTCGAGTTCGGTAGAGGCAGGCGGAATTCCCGGTGTAGCGGTGGAATGCGCAGATATCGGGAAGAACACCGATGGCGAAGGCAGCCTGCTGGGCCGCAACTGACGCTGAGGCGCGAAAGCTAGGGGAGCGAACAGG');
  });

  $('#search16SV4SubmitButton').on('click', function(event){

    document.getElementById("searchTaxonomy16SV4Container").classList.remove('d-none');
    document.getElementById("searchTaxonomyTaxContainer").classList.add('d-none');

    $.ajax({
      url:"./script/php/searchByTaxonomy_makeFolder.php",
      type: "POST",
      dataType: 'text',
      data: {
        folder_path: "../../server/result_16SV4/" + randomString
      }
    });

    var ifWGS = "N";
    var ifHQ = "N";
    if ($('#search16SV4WGScheck').prop('checked')){
      ifWGS = "Y";
    }
    if ($('#search16SV4HQcheck').prop('checked')){
      ifHQ = "Y";
    }

    var typeSequence = $('#search16SV4TypeInput').val();
    var fileInput = $('#search16SV4file').val();
    var similarityCutoff = $('#search16SV4similaryCutoff').val();
    if (similarityCutoff == ""){
      similarityCutoff = "97"
    }

    if (typeSequence != "" || fileInput != ""){
      if (fileInput != ""){
        $.ajax({
          url:"./script/php/searchByTaxonomy_fileMove.php",
          type: "POST",
          dataType: 'text',
          data: {
            originalFile: "../../server/temp_buffer/" + randomString + ".fasta",
            destFile: "../../server/result_16SV4/" + randomString + "/input.fasta"
          },
          success: function(response){}
        });
      }else{
        $.ajax({
          url:"./script/php/searchByTaxonomy_typeSequenceUpload.php",
          type: "POST",
          dataType: 'text',
          data: {
            data_fasta: typeSequence,
            output_file: "../../server/result_16SV4/" + randomString + "/input.fasta"
          },
          success: function(response){}
        });
      }
      $.ajax({
        url:"./script/php/searchByTaxonomy_16SV4execute.php",
        type: "POST",
        dataType: 'text',
        data: {
          isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
          isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
          isolates_WGS: "../../data/isolates_WGS.manual_update.tsv",
          isolates_HQgenome_list: "../../data/isolates_HQgenome.manual_update.tsv",
          keyword_WGS: ifWGS,
          keyword_HQ: ifHQ,
          work_folder: "../../server/result_16SV4/" + randomString,
          reference_db: "../../data/isolates_16SV4.auto_update.blast",
          blast_dir: "../../bin/ncbi-blast/bin",
          similarity_cutoff: similarityCutoff
        },
        beforeSend: function() {
          var searchTaxonomyLabel = document.getElementById('searchTaxonomyLabel');
          if (typeof(searchTaxonomyLabel) != 'undefined' && searchTaxonomyLabel != null){
            searchTaxonomyLabel.remove();
          }
          var searchTaxonomy16SV4Label = document.getElementById('searchTaxonomy16SV4Label');
          if (typeof(searchTaxonomy16SV4Label) != 'undefined' && searchTaxonomy16SV4Label != null){
            searchTaxonomy16SV4Label.remove();
          }
          document.getElementById("searchTaxonomy16SV4LabelContainer").innerHTML += '<div id="searchTaxonomy16SV4ProgressBar" class="row col-lg-12 d-flex justify-content-center"><div class="col-lg-1 order-lg-1"></div><div class="col-lg-1 order-lg-2 spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div><div class="col-lg-2 order-lg-3"><h4> searching...</h4></div></div>';
        },
        success: function(response){

          var searchTaxonomy16SV4ProgressBar = document.getElementById('searchTaxonomy16SV4ProgressBar');
          searchTaxonomy16SV4ProgressBar.remove();
          substring = response.split("\t\t\t\t\t");
          document.getElementById("searchTaxonomy16SV4LabelContainer").innerHTML += "<h4 id='searchTaxonomy16SV4Label'>Search result for " + substring[0] + " isolate(s)</h4>";

          $.fn.dataTable.ext.type.order["html-num-fmt-pre"] = function(data){
            data = data.replace(/<.*?>/g, '');
            data = data.replace(/\./g, '');
            data = data.replace(/,/g, '.');
            data = data.replace(/[^0-9\.\-]/g, '');
            if ( data === '' ){
              return -Infinity;
            }
            return data*1;
          };

          $('#searchTaxonomy16SV4Table').DataTable().clear().destroy();
          $('#searchTaxonomy16SV4Table').DataTable({
  		        serverSide: false,
  						scrollX: true,
  						searching: true,
  						ordering: true,
              colReorder: true,
              data: JSON.parse(substring[1]),
              dom: '<"top"lBf>t<"bottom"ip>',
              buttons: ['colvis', 'csv'],
              initComplete: function () {
                  var top_container = $('.top');
                  top_container.addClass("row col-lg-12");
                  $('.dataTables_length').addClass('col-auto');
                  $('.dataTables_length').addClass('order-lg-1');
                  var buttons = $('.dt-buttons');
                  buttons.addClass('col-auto');
                  buttons.addClass('order-lg-2');
                  buttons.removeClass('dt-buttons');
                  $('.dataTables_filter').addClass('col-auto');
                  $('.dataTables_filter').addClass('order-lg-3');
                  var button_column = $('.buttons-colvis');
                  button_column.addClass('btn btn-outline-dark btn-sm');
                  button_column.removeClass('dt-button');
                  $(".buttons-colvis span").text("Select column to show");
                  var button_csv = $('.buttons-csv');
                  button_csv.addClass('btn btn-outline-dark btn-sm');
                  button_csv.removeClass('dt-button');
                  $(".buttons-csv span").text("Export as CSV");
              },
              columnDefs: [{
                targets: 2,
                render: function (data, type, row, meta){
                  if (type === 'display'){
                    data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
                  }
                  return data;
                }
              },{targets: [2, 7, 19, 20, 21, 22, 23, 24, 25, 26], type: "html-num-fmt"}],
  		    });
        }
      });
    }
  });

  $('#search16SV4file').change(function(){
    if (document.getElementById("search16SV4file").value != ""){
      var search16SV4fileControl = document.getElementById("search16SV4file");
      var fileControl = search16SV4fileControl.files[0];
      var reader = new FileReader();
      reader.readAsText(fileControl);
      reader.onload = function(){
        $.ajax({
          url:"./script/php/searchByTaxonomy_fileUpload.php",
          type: "POST",
          dataType: 'text',
          data: {
            data_fasta: reader.result,
            output_file: "../../server/temp_buffer/" + randomString + ".fasta"
          },
          success: function(response){}
        });
      };
    }
  });

});