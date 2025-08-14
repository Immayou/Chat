const mockGroups = [
  {
    id: 1,
    name: 'Developers',
    users: [
      { id: 101, name: 'Max' },
      { id: 102, name: 'WasWas' },
      { id: 103, name: 'Andrew' },
    ],
  },
  {
    id: 2,
    name: 'Designers',
    users: [
      { id: 201, name: 'Hanna' },
      { id: 202, name: 'Maryna' },
    ],
  },
  {
    id: 3,
    name: 'Testers',
    users: [{ id: 301, name: 'Oleksandra' }],
  },
];

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

  return {
    get_groups,
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
//                 memberNameEl.onclick = function () {
//                     //alert(this.dataset.id);
//                     alert(this.parentElement.dataset.id);

//                 }
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
//     return {
//         get_groups: get_groups
//     };
// })(window);
