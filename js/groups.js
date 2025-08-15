const groups = (function () {
  function get_groups() {
    srv.exec('GetGroups', 'get', null, result => {
      const members = result;
      const containerEl = document.querySelector('#users_in_group');

      if (!containerEl) return;

      containerEl.innerHTML = '';

      const headerEl = document.createElement('div');
      headerEl.classList.add('group-header');
      headerEl.innerHTML = `
        <div class="header-cell">#</div>
        <div class="header-cell">Group name</div>
        <div class="header-cell">Members</div>
      `;
      containerEl.appendChild(headerEl);

      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const rowEl = document.createElement('div');
        rowEl.classList.add('group-row');
        rowEl.dataset.id = member.id;

        rowEl.innerHTML = `
          <div class="cell">${i + 1}</div>
          <div class="cell group-name" data-id="${member.id}">${
          member.name
        }</div>
          <div class="cell">${member.users.length}</div>
          <div class="btn_wrapper">
          <button class="edit-btn">
            <svg width="19" height="19" class="edit-icon">
              <use href="./sprite/sprite.svg#icon-edit"></use>
            </svg>
          </button>
          <button class="delete-btn">
            <svg width="16" height="16" class="close-icon">
              <use href="./sprite/sprite.svg#icon-delete"></use>
            </svg>
          </button>
          </div>
        `;

        containerEl.appendChild(rowEl);

        rowEl.querySelector('.group-name').onclick = function () {
          alert(this.dataset.id);
        };
      }
    });
  }
  function append_delete_button(div) {
    const deleteMemberBtnEl = document.createElement('button');

    const closeIconEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    closeIconEl.setAttribute('width', '26');
    closeIconEl.setAttribute('height', '26');
    closeIconEl.classList.add('close-icon');

    const closeIconUseEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'use'
    );
    closeIconUseEl.setAttribute('href', './sprite/sprite.svg#icon-delete');

    closeIconEl.append(closeIconUseEl);
    deleteMemberBtnEl.append(closeIconEl);

    div.appendChild(deleteMemberBtnEl);
    return deleteMemberBtnEl;
  }
  function get_users() {
    srv.exec('GetUsers', 'get', null, result => {
      // console.log(result);
      var container = document.getElementById('div-users');
      for (var i = 0; i < result.length; i++) {
        var user = result[i];
        var div = document.createElement('div');
        div.innerHTML = user.displayName;
        div.dataset.id = user.userId;
        div.style.cursor = 'pointer';
        div.style.textAlign = 'left';

        div.style.marginLeft = '140px';
        div.onclick = function () {
          alert('Edit user : ' + this.dataset.id);
        };
        var btn = append_delete_button(div);
        btn.onclick = function () {
          alert('Delete user : ' + this.parentElement.dataset.id);
        };
        container.appendChild(div);
      }
    });
  }
  return {
    get_groups,
    get_users,
  };
})();

// var groups = (function () {

//     function get_groups() {
//         srv.exec("GetGroups", "get", null, result => {
//             var members = result;
//             const membersListEl = document.querySelector("#group_members");

//             for (var i = 0; i < members.length; i++) {
//                 member = members[i];
//                 const memberItemEl = document.createElement("li");
//                 memberItemEl.classList.add("member");
//                 memberItemEl.dataset.id = member.id;
//                 membersListEl.appendChild(memberItemEl);

//                 const memberNameEl = document.createElement("span");
//                 memberNameEl.textContent = member.name;
//                 memberNameEl.dataset.id = member.id;
//                 memberItemEl.append(memberNameEl);
//                 memberNameEl.style.cursor = 'pointer';

//                 const memberCountEl = document.createElement("span");
//                 memberCountEl.textContent = "members: " + member.users.length;
//                 memberItemEl.append(memberCountEl);

//                 const deleteMemberBtnEl = document.createElement("button");
//                 deleteMemberBtnEl.classList.add("delete-btn");

//                 const closeIconEl = document.createElementNS(
//                     "http://www.w3.org/2000/svg",
//                     "svg"
//                 );
//                 closeIconEl.setAttribute("width", "16");
//                 closeIconEl.setAttribute("height", "16");
//                 closeIconEl.classList.add("close-icon");

//                 const closeIconUseEl = document.createElementNS(
//                     "http://www.w3.org/2000/svg",
//                     "use"
//                 );
//                 closeIconUseEl.setAttribute("href", "./sprite/sprite.svg#icon-delete");

//                 closeIconEl.append(closeIconUseEl);
//                 deleteMemberBtnEl.append(closeIconEl);
//                 memberItemEl.append(deleteMemberBtnEl);

//                 // return memberItemEl;
//             }

//         });

//     }
//     function show_group() {

//     }
//     function append_delete_button(div) {
//         const deleteMemberBtnEl = document.createElement("button");

//         const closeIconEl = document.createElementNS(
//             "http://www.w3.org/2000/svg",
//             "svg"
//         );
//         closeIconEl.setAttribute("width", "26");
//         closeIconEl.setAttribute("height", "26");
//         closeIconEl.classList.add("close-icon");

//         const closeIconUseEl = document.createElementNS(
//             "http://www.w3.org/2000/svg",
//             "use"
//         );
//         closeIconUseEl.setAttribute("href", "./sprite/sprite.svg#icon-delete");

//         closeIconEl.append(closeIconUseEl);
//         deleteMemberBtnEl.append(closeIconEl);

//         div.appendChild(deleteMemberBtnEl);
//         return deleteMemberBtnEl;
//     }
//     function get_users() {
//         srv.exec("GetUsers", "get", null, result => {
//             // console.log(result);
//             var container = document.getElementById("div-users");
//             for (var i = 0; i < result.length; i++) {
//                 var user = result[i];
//                 var div = document.createElement("div");
//                 div.innerHTML = user.displayName;
//                 div.dataset.id = user.userId;
//                 div.style.cursor = "pointer";
//                 div.style.textAlign = 'left';

//                 div.style.marginLeft = '140px';
//                 div.onclick = function () {
//                     alert('Edit user : ' + this.dataset.id);
//                 }
//                 var btn = append_delete_button(div);
//                 btn.onclick = function () {
//                     alert('Delete user : ' + this.parentElement.dataset.id);
//                 }
//                 container.appendChild(div);
//             }
//         });
//     }
//     return {
//         get_groups: get_groups,
//         get_users: get_users
//     };
// })(window);
