const socket = io.connect(window.location.origin);

var handleSubmitNewPost = (data) => {
  console.log(data);
  if (!data.published) return;
  socket.emit('post', data);
};

const createToaster = (answer) => {
  toastr.options.closeButton = true;
  toastr.options.positionClass = 'toast-absolute toast-top-left';
  toastr.info(
    `${answer.title} was created by ${answer.login} See more on /blog page`,
    'New post',
  );
};

socket.on('post', (answer) => {
  createToaster(answer);
});
