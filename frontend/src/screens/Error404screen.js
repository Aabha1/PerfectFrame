// error screen for pages that are yet created or for unknown url

const Error404Screen = {
    render: () => `<div class="error">
    <div>
      <a href="/#/"><i class="fa fa-circle-arrow-left"></i>Go to home screen</a>
    </div>
    PAGE NOT FOUND </div>`,
};
export default Error404Screen;