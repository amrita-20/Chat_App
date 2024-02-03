function loginView(state) {
  return ` <div class="login">
    <div class="form-container">
        <form class="login-form">
            <div class="form-group">
                <label class="label" for="username">Username</label>
                <input class="input" type="text" name="username" id="username">
            </div>
            <button class="button login-button" type="button">Submit</button>
        </form>
    </div>
</div>`;
}

export default loginView;
