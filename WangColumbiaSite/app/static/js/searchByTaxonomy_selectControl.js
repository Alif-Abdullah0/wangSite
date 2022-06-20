$(document).ready(function(){
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
			for(var i in k_list){
				var option = document.createElement("option");
				option.text = k_list[i];
				option.value = k_list[i];
				document.getElementById("select_k").add(option);
			}
			for(var i in p_list){
				var option = document.createElement("option");
				option.text = p_list[i];
				option.value = p_list[i];
				document.getElementById("select_p").add(option);
			}
			for(var i in c_list){
				var option = document.createElement("option");
				option.text = c_list[i];
				option.value = c_list[i];
				document.getElementById("select_c").add(option);
			}
			for(var i in o_list){
				var option = document.createElement("option");
				option.text = o_list[i];
				option.value = o_list[i];
				document.getElementById("select_o").add(option);
			}
			for(var i in f_list){
				var option = document.createElement("option");
				option.text = f_list[i];
				option.value = f_list[i];
				document.getElementById("select_f").add(option);
			}
			for(var i in g_list){
				var option = document.createElement("option");
				option.text = g_list[i];
				option.value = g_list[i];
				document.getElementById("select_g").add(option);
			}
			for(var i in s_list){
				var option = document.createElement("option");
				option.text = s_list[i];
				option.value = s_list[i];
				document.getElementById("select_s").add(option);
			}
		}
	});


	document.getElementById("select_k").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "kingdom",
				taxonomy_value: document.getElementById("select_k").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
	};

	document.getElementById("select_p").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "phylum",
				taxonomy_value: document.getElementById("select_p").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
				document.getElementById("select_p").value = select_list[1];

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
	};

	document.getElementById("select_c").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "class",
				taxonomy_value: document.getElementById("select_c").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
				document.getElementById("select_p").value = select_list[1];

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
				document.getElementById("select_c").value = select_list[2];

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
	};

	document.getElementById("select_o").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "order",
				taxonomy_value: document.getElementById("select_o").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
				document.getElementById("select_p").value = select_list[1];

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
				document.getElementById("select_c").value = select_list[2];

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
				document.getElementById("select_o").value = select_list[3];

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
	};

	document.getElementById("select_f").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "family",
				taxonomy_value: document.getElementById("select_f").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
				document.getElementById("select_p").value = select_list[1];

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
				document.getElementById("select_c").value = select_list[2];

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
				document.getElementById("select_o").value = select_list[3];

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
				document.getElementById("select_f").value = select_list[4];

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
	};

	document.getElementById("select_g").onchange = function(){
		$.ajax({
			url: "./script/php/searchByTaxonomy_change.php",
			type: "POST",
			dataType: 'text',
			data: {
				taxonomy_list: "../../data/taxonomy.tree.tsv",
				taxonomy_control: "genus",
				taxonomy_value: document.getElementById("select_g").value
			},
			success: function(response){
				var substring = response.split("\t\t\t\t\t");
				k_list = JSON.parse(substring[0]);
				p_list = JSON.parse(substring[1]);
				c_list = JSON.parse(substring[2]);
				o_list = JSON.parse(substring[3]);
				f_list = JSON.parse(substring[4]);
				g_list = JSON.parse(substring[5]);
				s_list = JSON.parse(substring[6]);
				select_list = JSON.parse(substring[7]);

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
				document.getElementById("select_k").value = select_list[0];

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
				document.getElementById("select_p").value = select_list[1];

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
				document.getElementById("select_c").value = select_list[2];

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
				document.getElementById("select_o").value = select_list[3];

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
				document.getElementById("select_f").value = select_list[4];

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
				document.getElementById("select_g").value = select_list[5];

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
	};

	document.getElementById("select_s").onchange = function(){

		if (document.getElementById("select_k").value == "default"){
			$.ajax({
				url: "./script/php/searchByTaxonomy_change.php",
				type: "POST",
				dataType: 'text',
				data: {
					taxonomy_list: "../../data/taxonomy.tree.tsv",
					taxonomy_control: "species",
					taxonomy_value: document.getElementById("select_s").value
				},
				success: function(response){
					var substring = response.split("\t\t\t\t\t");
					k_list = JSON.parse(substring[0]);
					p_list = JSON.parse(substring[1]);
					c_list = JSON.parse(substring[2]);
					o_list = JSON.parse(substring[3]);
					f_list = JSON.parse(substring[4]);
					g_list = JSON.parse(substring[5]);
					s_list = JSON.parse(substring[6]);
					select_list = JSON.parse(substring[7]);

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
					document.getElementById("select_k").value = select_list[0];

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
					document.getElementById("select_p").value = select_list[1];

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
					document.getElementById("select_c").value = select_list[2];

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
					document.getElementById("select_o").value = select_list[3];

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
					document.getElementById("select_f").value = select_list[4];

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
					document.getElementById("select_g").value = select_list[5];

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
					document.getElementById("select_s").value = select_list[6];
				}
			});
		}
	};


});