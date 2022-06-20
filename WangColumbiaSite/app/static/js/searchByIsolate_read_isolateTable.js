
var getAbsoluteUrl = (function() {
	var a;
	return function(url) {
		if(!a) a = document.createElement('a');
		a.href = url;
		return a.href;
	};
})();

$(document).ready(function(){
	var currentDir = getAbsoluteUrl();
	$("#allIsolateTable").DataTable({
		processing: true,
		serverSide: true,
		searching: false,
		ordering: false,
		scrollX: true,
		colReorder: true,
		columnDefs: [{
			targets: 0,
			render: function (data, type, row, meta){
				if (type === 'display'){
					data = '<a target="_blank" href="isolate.html?isolateID=' + data + '">' + data + '</a>';
				}
				return data;
			}
		}],
		ajax: function (data, callback, settings) {
			$.ajax({
				url:"./script/php/searchByIsolate_read_isolateTable.php",
				type: "POST",
				dataType: 'text',
				data: {
					start: data.start,
					length: data.length,
					isolates_metadata: "../../data/isolates_metadata.auto_update.tsv",
					isolates_16SV4: "../../data/isolates_16SV4.auto_update.tsv",
					isolates_WGS: "../../data/isolates_WGS.manual_update.tsv"},
				success: function(response){
					substring = response.split("\t\t\t\t\t");
					setTimeout(function(){
						callback({
							draw: data.draw,
							data: JSON.parse(substring[1]),
							recordsTotal: substring[0],
							recordsFiltered: substring[0]
						});
					document.getElementById("boradIsolateCount").innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Contains " + substring[0] + " isolates spanning >400 taxa with a rich set of linked<br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp morphologic, phenotypic, taxonomic and WGS data";
					}, 1);
				}
			});
		}
	});

	$("#searchTaxonomyTable").DataTable({
		serverSide: false,
		searching: true,
		ordering: true,
		scrollX: true,
	});

	$("#searchTaxonomy16SV4Table").DataTable({
		serverSide: false,
		searching: true,
		ordering: true,
		scrollX: true,
	});

});