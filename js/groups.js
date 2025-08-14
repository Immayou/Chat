var groups = (function () {

    function get_groups() {
        srv.exec("GetGroups", "get", null, result => {
            var members = result;
            const membersListEl = document.querySelector("#group_members");

            for (var i = 0; i < members.length; i++) {
                member = members[i];
                const memberItemEl = document.createElement("li");
                memberItemEl.classList.add("member");
                memberItemEl.dataset.id = member.id;
                membersListEl.appendChild(memberItemEl);

                const memberNameEl = document.createElement("span");
                memberNameEl.textContent = member.name;
                memberNameEl.dataset.id = member.id;
                memberItemEl.append(memberNameEl);
                memberNameEl.onclick = function () {
                    //alert(this.dataset.id);
                    alert(this.parentElement.dataset.id);
                    
                }
                memberNameEl.style.cursor = 'pointer';
                const memberCountEl = document.createElement("span");
                memberCountEl.textContent = "members: " + member.users.length;
                memberItemEl.append(memberCountEl);
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

                // return memberItemEl;
            }

        });

    }
    function show_group() {

    }
    return {
        get_groups: get_groups
    };
})(window);