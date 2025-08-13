const members = ["WasWas", "Max", "Andrew", "Yulya"];
const membersListEl = document.querySelector("#group_members");

const makeMembersItems = members.map((member) => {
  const memberItemEl = document.createElement("li");
  memberItemEl.classList.add("member");

  const memberNameEl = document.createElement("span");
  memberNameEl.textContent = member;
  memberItemEl.append(memberNameEl);

  const deleteMemberBtnEl = document.createElement("button");
  deleteMemberBtnEl.classList.add("delete-btn");

  const closeIconEl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeIconEl.setAttribute("width", "16");
  closeIconEl.setAttribute("height", "16");
  closeIconEl.classList.add("close-icon");

  const closeIconUseEl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "use"
  );
  closeIconUseEl.setAttribute("href", "./sprite/sprite.svg#icon-delete");

  closeIconEl.append(closeIconUseEl);
  deleteMemberBtnEl.append(closeIconEl);
  memberItemEl.append(deleteMemberBtnEl);

  return memberItemEl;
});

membersListEl.append(...makeMembersItems);
