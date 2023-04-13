$(document).ready(function () {
  // Load JSON data
  $.getJSON("characters.json", function (data) {
    // Append rows to table body
    var tbody = $("#characters tbody");
    $.each(data, function (key, value) {
      var row = $("<tr></tr>");
      row.append("<td>" + value.firstname + "</td>");
      row.append("<td>" + value.lastname + "</td>");
      row.append("<td>" + value.age + "</td>");
      row.append("<td>" + value.gender + "</td>");
      row.append("<td>" + value.occupation + "</td>");
      row.append("<td>" + value.interests + "</td>");
      row.append("<td>" + value.DOB + "</td>");
      tbody.append(row);
    });

    $("#characters th a").click(function () {
      var column = $(this).parent().index();
      var rows = tbody.find("tr").toArray();

      // Get current sort order
      var sortOrder = $(this).attr("data-sort-order") || "asc";
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
      $(this).attr("data-sort-order", sortOrder);

      // Remove chevrons from all other headers
      $("#characters th a").html(function () {
        return $(this).text();
      });

      // Remove chevrons from all headers
      $("#characters th a").not(this).removeClass("ascending descending");

      // Add chevron to current header
      $(this).toggleClass("ascending", sortOrder === "asc");
      $(this).toggleClass("descending", sortOrder === "desc");

      rows.sort(function (a, b) {
        var aValue, bValue;
        if (column === 3) {
          // age column
          aValue = parseInt(
            $(a)
              .find("td:eq(" + column + ")")
              .text()
          );
          bValue = parseInt(
            $(b)
              .find("td:eq(" + column + ")")
              .text()
          );
        } else if (column === 7) {
          // dateOfBirth column
          aValue = new Date(
            $(a)
              .find("td:eq(" + column + ")")
              .text()
          );
          bValue = new Date(
            $(b)
              .find("td:eq(" + column + ")")
              .text()
          );
        } else {
          aValue = $(a)
            .find("td:eq(" + column + ")")
            .text();
          bValue = $(b)
            .find("td:eq(" + column + ")")
            .text();
        }
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
        }
      });

      $.each(rows, function (index, row) {
        tbody.append(row);
      });
    });
  });
});
