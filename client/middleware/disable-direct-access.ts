export default ({store, redirect}): any => {
  if (!store.state.app.result.status) {
    return redirect('/');
  }
}
