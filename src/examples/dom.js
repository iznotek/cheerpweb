const cpp_code = `
#include <cheerp/client.h>
#include <cheerp/clientlib.h>

// We need to extend the client namespace to declare our
// custom JavaScript function
namespace client
{
    // The name should be the same as the JavaScript one
    // The parameters needs to be a const client::String reference
    // so that implicit conversion from const char* is supported
    void changeTitle(const String& str);
}

using namespace client;

void webMain()
{
    Element* titleElement=document.getElementById("pagetitle");
    String* oldText=titleElement->get_textContent();
    changeTitle("Literal C++ string");
}`.trim();

const html_code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cheerp test</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>
    <script>
        // Use jQuery to make a (trivial) change to the page
        function changeTitle(str)
        {
                $("#pagetitle").text(str);
        }
    <\/script>
  </head>
  <body>
  <h1 id="pagetitle">Boring static text</h1>
  <!-- MARKER: Include javascript here. -->
  </body>
</html>`.trim();

const js_code = ``.trim();

const flags = `
-cheerp-pretty-code
-cheerp-no-type-optimizer
-cheerp-no-native-math
-cheerp-no-math-imul
-cheerp-no-math-fround
-O3
-target cheerp`.trim()

const wasm_code = '';

export const example = {
    title: 'DOM example',
    cpp_code: cpp_code,
    js_code: js_code,
    wasm_code: wasm_code,
    html_code: html_code,
    flags: flags
}

