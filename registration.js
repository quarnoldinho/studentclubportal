let editIndex = -1;

const memberForm = document.getElementById("memberForm");
const memberName = document.getElementById("memberName");
const email = document.getElementById("email");
const yearLevel = document.getElementById("yearLevel");
const organization = document.getElementById("organization");
const phone = document.getElementById("phone");
const memberTableBody = document.getElementById("memberTableBody");
const jsonOutput = document.getElementById("jsonOutput");
const messageBox = document.getElementById("messageBox");
const clearBtn = document.getElementById("clearBtn");

function getMembers() {
  let members = localStorage.getItem("members");
  return members ? JSON.parse(members) : [];
}

function saveMembers(members) {
  localStorage.setItem("members", JSON.stringify(members));
}

function showMessage(text, type) {
  messageBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${text}
    </div>
  `;
}

function clearValidation() {
  memberName.classList.remove("is-invalid");
  email.classList.remove("is-invalid");
  yearLevel.classList.remove("is-invalid");
  organization.classList.remove("is-invalid");
}

function validEmail(emailText) {
  return emailText.includes("@") && emailText.includes(".");
}

function validateForm() {
  let isValid = true;
  clearValidation();

  if (memberName.value.trim() === "") {
    memberName.classList.add("is-invalid");
    isValid = false;
  }

  if (email.value.trim() === "" || !validEmail(email.value.trim())) {
    email.classList.add("is-invalid");
    isValid = false;
  }

  if (yearLevel.value.trim() === "") {
    yearLevel.classList.add("is-invalid");
    isValid = false;
  }

  if (organization.value.trim() === "") {
    organization.classList.add("is-invalid");
    isValid = false;
  }

  return isValid;
}

function renderMembers() {
  let members = getMembers();
  memberTableBody.innerHTML = "";

  if (members.length === 0) {
    memberTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No members registered yet.</td>
      </tr>
    `;
  } else {
    for (let i = 0; i < members.length; i++) {
      memberTableBody.innerHTML += `
        <tr>
          <td>${members[i].memberName}</td>
          <td>${members[i].email}</td>
          <td>${members[i].yearLevel}</td>
          <td>${members[i].organization}</td>
          <td>${members[i].phone || ""}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" onclick="editMember(${i})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteMember(${i})">Delete</button>
          </td>
        </tr>
      `;
    }
  }

  jsonOutput.textContent = JSON.stringify(members, null, 2);
}

function editMember(index) {
  let members = getMembers();
  let member = members[index];

  memberName.value = member.memberName;
  email.value = member.email;
  yearLevel.value = member.yearLevel;
  organization.value = member.organization;
  phone.value = member.phone;

  editIndex = index;
  showMessage("Member loaded for editing.", "info");
}

function deleteMember(index) {
  let members = getMembers();
  members.splice(index, 1);
  saveMembers(members);
  renderMembers();
  showMessage("Member deleted successfully.", "danger");
}

function resetForm() {
  memberForm.reset();
  editIndex = -1;
  clearValidation();
}

memberForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) {
    showMessage("Please fill in all required fields correctly.", "danger");
    return;
  }

  let members = getMembers();

  let memberData = {
    memberName: memberName.value.trim(),
    email: email.value.trim(),
    yearLevel: yearLevel.value.trim(),
    organization: organization.value.trim(),
    phone: phone.value.trim()
  };

  if (editIndex === -1) {
    members.push(memberData);
    showMessage("Member added successfully.", "success");
  } else {
    members[editIndex] = memberData;
    showMessage("Member updated successfully.", "success");
    editIndex = -1;
  }

  saveMembers(members);
  renderMembers();
  resetForm();
});

clearBtn.addEventListener("click", function () {
  resetForm();
  messageBox.innerHTML = "";
});

renderMembers();
