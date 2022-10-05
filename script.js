const SKELETON_TEMPLATE =
  `<div style="font-family: &quot;Times New Roman&quot; serif; font-size: 12pt;">` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0px; margin-bottom: 0px; text-align: left;">` +
      `%{{your-name}}` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 0pt; text-align: left;">` +
      `%{{subj-name}}` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 0pt; text-align: left;">` +
      `%{{teacher-name}}` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 10pt; text-align: left;">` +
      `%{{the-date}}` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 10pt; text-align: center;">` +
      `%{{the-title}}` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 0pt; text-align: left; text-indent: 36pt;">` +
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel pretium lectus quam id leo in. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Convallis posuere morbi leo urna molestie at. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Sed elementum tempus egestas sed sed risus. Leo urna molestie at elementum eu. Lorem sed risus ultricies tristique nulla aliquet enim. Posuere ac ut consequat semper viverra nam. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Feugiat nibh sed pulvinar proin. Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nibh nisl condimentum id venenatis a. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis.` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 0pt; text-align: left; text-indent: 36pt;">` +
      `Magnis dis parturient montes nascetur. Semper risus in hendrerit gravida rutrum quisque. Magna eget est lorem ipsum dolor. Neque egestas congue quisque egestas diam in arcu cursus. Eu mi bibendum neque egestas congue quisque. Leo in vitae turpis massa sed elementum tempus egestas. Risus ultricies tristique nulla aliquet enim tortor at. Vivamus arcu felis bibendum ut tristique. Velit egestas dui id ornare arcu odio ut sem nulla. In eu mi bibendum neque. Nibh sit amet commodo nulla facilisi nullam. Egestas erat imperdiet sed euismod nisi. Ipsum dolor sit amet consectetur adipiscing elit duis. In iaculis nunc sed augue. Semper viverra nam libero justo laoreet sit amet. Nisl condimentum id venenatis a.` +
    `</p>` +
    `<p style="font-size: 12pt; line-height: 200%; margin-top: 0; margin-bottom: 0pt; text-align: left; text-indent: 36pt;">` +
      `Nisl nunc mi ipsum faucibus. Vehicula ipsum a arcu cursus vitae congue. Suspendisse sed nisi lacus sed viverra. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Nunc aliquet bibendum enim facilisis gravida neque convallis. Urna duis convallis convallis tellus id. Odio ut enim blandit volutpat. Sapien pellentesque habitant morbi tristique senectus et netus et. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Tristique risus nec feugiat in. Amet nisl purus in mollis.` +
    `</p>` +
  `</div>`;

const INPUTS = [
  {type: "your-name",    fallback: "Your Name"},
  {type: "teacher-name", fallback: "Teacher's Name"},
  {type: "subj-name",    fallback: "Class/Subject"},
  {type: "the-date",     fallback: "1 Jan. 2000"},
  {type: "the-title",    fallback: "The Title"},
];

function modal_open() {
  $("#modal-box").css("display", "flex");
}

function modal_close() {
  $("#modal-box").css("display", "none");
}

function generate() {
  modal_open();
  $("#modal-title").text("Loading...");

  let skeleton = SKELETON_TEMPLATE.trim();

  for (const info of INPUTS) {
    skeleton = skeleton.replace(`%{{${info.type}}}`, get_input(info.type, info.fallback));
  }

  $("#output").html(skeleton);
  
  copy_to_clipboard($("#output").html().trim());
  console.log($("#output").html().trim())
}

function get_input(id, fallback) {
  let given = $(`input#${id}`).val().trim();

  if (!given) {
    given = fallback;
  }

  if (id === "the-date") {
    given = format_date(given);
  }

  return given;
}

function format_date(iso_format) {
  const date = new Date(iso_format);

  let d = date.getUTCDate();
  let m = date.getUTCMonth();
  let y = date.getUTCFullYear();

  m = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
    "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
  ][m];

  return `${d} ${m} ${y}`;
}

function copy_to_clipboard(html) {
  let type = "text/html";
  let blob = new Blob([html], {type});
  let data = [new ClipboardItem({[type]: blob})];

  navigator.clipboard.write(data).then(
    function success() {
      $("#modal-title").text("Text has been copied to clipboard!");
    },
    function failure(err) {
      $("#modal-title").html(`Error: ${err}<br /><br />Try copying manually instead.`);
    }
  );
}
