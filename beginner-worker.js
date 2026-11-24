// Each run gets its own interpreter, so a previous edit cannot affect the next run.
try {
  importScripts(
    './vendor/skulpt/skulpt.min.js',
    './vendor/skulpt/skulpt-sys.js',
  );
  self.postMessage({ ready: true });
} catch {
  self.postMessage({
    error:
      'The Python interpreter could not load. Reload the lesson and run the example again.',
  });
}

self.onmessage = async ({ data }) => {
  let output = '';
  let clipped = false;
  const limit = 4000;
  try {
    Sk.configure({
      __future__: Sk.python3,
      execLimit: 4000,
      output: (value) => {
        const text = String(value);
        const remaining = limit - output.length;
        output += text.slice(0, remaining);
        if (text.length > remaining) clipped = true;
      },
      inputfun: () => {
        throw new Error(
          'This editor runs the values written in the code. Enter a number in the function call instead of using input().',
        );
      },
    });
    await Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<week-one>', false, data.source, true),
    );
    self.postMessage({ output, clipped });
  } catch (error) {
    self.postMessage({ output, clipped, error: String(error).slice(0, 650) });
  }
};
