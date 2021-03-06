const cpp_code = `
#include <cheerp/client.h>
#include <cheerp/clientlib.h>

using namespace client;

// The class can of course have any name
// The [[cheerp::jsexport]] attribute tells Cheerp to make
// the class available to JavaScript code
class [[cheerp::jsexport]] JsBridge
{
private:
    // The class is allowed to have member variables
    // but they should all be trivially destructible
    int callCount;
public:
    JsBridge():callCount(0)
    {
    }
    int addAndReturn(int a)
    {
        console.log("Called C++ code");
        callCount+=a;
        return callCount;
    }
};

// An entry point, even if empty, is still required
void webMain()
{
}`.trim();

const html_code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cheerp test</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>
        var jsBridge=null;
        function callCPPCode()
        {
            if(!jsBridge)
                jsBridge=new JsBridge();
            var ret=jsBridge.addAndReturn(3);
            $("#clickText").text("C++ code returned "+ret);
            return false;
        }
    </script>
  </head>
  <body>
  <a id="clickText" href="javascript:void(0)" onclick="callCPPCode()">Click to call C++ code</a>
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
    title: 'Call C++ example',
    cpp_code: cpp_code,
    js_code: js_code,
    wasm_code: wasm_code,
    html_code: html_code,
    flags: flags
}
