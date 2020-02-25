var currentUser = commonStrings.CurrentUser;
var currentuserName;
var isRefresh;
var getAssignedRefresh;
var isAssignedToUser,
    isChangedAssingedUser;
var instForAddNew,
    objForAddNew,
    parentIdForAddNew,
    instForUpdate,
    objForUpdate,
    idForUpdate,
    tridForUpdate;

$(document).ready(function () {
    currentuserName = GetADUserNameById(currentUser);
    document.getElementById('user-account-name').innerHTML = currentuserName;
});

//Date picker Function
$(function () {
    $("#input-add-task-duedate").datepicker();
    $("#input-update-task-duedate").datepicker();
});


//Add click function
$("#btn-add-task-rout").click(function () {
    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUser) {
            var title = $("#input-add-task-title").val(),
                duedate = $("#input-add-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val();

            isRoutTask = true;
            AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto);
            ClearHideTask();
            $("#btn-add-task-rout").hide();
            isAssignedToUser = false;
        }
        else {
            alert("Please SEARCH persons you want assigne task !!!");
        }
    }
});

$("#btn-add-initiative").click(function () {
    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUser) {
            var title = $("#input-add-initiative-title").val(),
                wgr = $("#wgr-search-result-user-id").val(),
                cgr = $("#cgr-search-result-user-id").val(),
                pdoc = $("#input-add-initiative-pdoc").val(),
                pnr = $("#input-add-initiative-pnr").val(),
                inctaw = $("#input-add-initiative-inctaw").val(),
                pc = $("#input-add-initiative-pc").val(),
                eac = $("#input-add-initiative-eac").val(),
                ac = $("#input-add-initiative-ac").val(),
                gap = $("#input-add-initiative-gap").val()
            AddInitiative(instForAddNew, objForAddNew, parentIdForAddNew, title, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap);
            ClearHideInitiative();
            isAssignedToUser = false;
        }
        else {
            alert("Please SEARCH persons you want assigne responsibility !!!");
        }
    }
});

$("#btn-add-group").click(function () {
    if (ValidateGroupInputs()) {
        var title = $("#input-add-group-title").val();
        AddGroup(instForAddNew, objForAddNew, parentIdForAddNew, title);
        ClearHideGroup();
    }
});

$("#btn-add-task").click(function () {
    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUser) {
            var title = $("#input-add-task-title").val(),
                duedate = $("#input-add-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val();
            isRoutTask = false;
            AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto);
            ClearHideTask();
            $("#btn-add-task").hide();
            isAssignedToUser = false;
        }
        else {
            alert("Please SEARCH persons you want assigne task !!!");
        }
    }
});


//Update click functions
$("#btn-update-initiative").click(function () {
    if (isAssignedToUser) {
        if (isChangedAssingedUser) {
            isAssignedToUser = false;
            isChangedAssingedUser = false;
        }
        else {
            isAssignedToUser = true;
        }
    }
    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUser) {
            var wgr = $("#wgr-search-result-user-id").val(),
                cgr = $("#cgr-search-result-user-id").val(),
                pdoc = $("#input-update-initiative-pdoc").val(),
                pnr = $("#input-update-initiative-pnr").val(),
                inctaw = $("#input-update-initiative-inctaw").val(),
                pc = $("#input-update-initiative-pc").val(),
                eac = $("#input-update-initiative-eac").val(),
                ac = $("#input-update-initiative-ac").val(),
                gap = $("#input-update-initiative-gap").val()
            UpdateInitiative(instForUpdate, objForUpdate, tridForUpdate, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap);
            ClearHideInitiativeUpdate();
            isAssignedToUser = false;
        }
        else {
            alert("Please SEARCH persons you want assigne responsibility !!!");
        }
    }
});

$("#btn-update-task").click(function () {
    if (isAssignedToUser) {
        if (isChangedAssingedUser) {
            isAssignedToUser = false;
            isChangedAssingedUser = false;
        }
        else {
            isAssignedToUser = true;
        }
    }

    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUser) {
            var duedate = $("#input-update-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val(),
                status;
            if ($("#input-update-task-status").is(':checked')) {
                status = 1;
            } else {
                status = 2;
            }
            UpdateTask(instForUpdate, objForUpdate, idForUpdate, duedate, assignedto, status);
            ClearHideTaskUpdate();
            isAssignedToUser = false;
        }
        else {
            alert("Please SEARCH persons you want assigne task !!!");
        }
    }
});


//Search users click functions
$("#btn-add-task-assignedto-search-user").click(function () {
    var userid = $("#input-add-task-assignedto").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-add-task-assignedto").val(data);
        $("#assignedTo-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-add-initiative-wgr-search-user").click(function () {
    var userid = $("#input-add-task-wgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-add-task-wgr").val(data);
        $("#wgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-add-initiative-cgr-search-user").click(function () {
    var userid = $("#input-add-task-cgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-add-task-cgr").val(data);
        $("#cgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-update-initiative-wgr-search-user").click(function () {
    var userid = $("#input-update-initiative-wgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-update-initiative-wgr").val(data);
        $("#wgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-update-initiative-cgr-search-user").click(function () {
    var userid = $("#input-update-initiative-cgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-update-initiative-cgr").val(data);
        $("#cgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-update-task-assignedto-search-user").click(function () {
    var userid = $("#input-update-task-title").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUser = true;
        $("#input-update-task-title").val(data);
        $("#assignedTo-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});


//Get AD user name
function GetADUserNameById(userid) {
    var result;
    $.ajax({
        url: "../Home/GetFullName",
        type: "POST",
        datatype: "json",
        data: { userid },
        async: false,
        success: function (data) {
            result = data;
        }
    });

    return result;
}


//Tree data
function TreeData() {
    var data = {
        url: "../Tree/GetTree",
        type: "GET",
        data: { currentUser },
        datatype: "json"
    };
    //if (getAssignedRefresh) {
    //    data = {
    //        url: "../Tree/GetTree",
    //        type: "GET",
    //        data: currentUser,
    //        datatype: "json"
    //    };
    //    getAssignedRefresh = false;
    //}

    return data;
}

//JS Tree
$('#jstree').jstree({
    "plugins": [
        "table", "contextmenu"
    ],
    "core": {

        'data': TreeData(),
        "check_callback": true
    },
    "contextmenu": {
        items: function (o, cb) { // Could be an object directly
            var items = {
                "create": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Create",
                    "action": function (data) {
                        instForAddNew = $.jstree.reference(data.reference);
                        objForAddNew = instForAddNew.get_node(data.reference);
                        parentIdForAddNew = objForAddNew.id.substring(1);

                        var isRoutTask;
                        if (objForAddNew.id.substring(0, 1) == "G") {
                            if (objForAddNew.original.templateName != "") {
                                ClearHideTask();
                                $("#btn-add-task-rout").show();
                                $("#prompt-add-task").show();

                            }
                            else {
                                if (objForAddNew.parent.substring(1) == 1) {
                                    ClearHideInitiative();
                                    $("#prompt-add-initiative").show();

                                }
                                else {
                                    ClearHideGroup();
                                    $("#prompt-add-group").show();

                                }
                            }
                        }
                        else {
                            ClearHideTask();
                            $("#prompt-add-task").show();
                            $("#btn-add-task").show();

                        }

                    }
                },
                "update": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
                    "label": "Update",
                    "action": function (data) {
                        instForUpdate = $.jstree.reference(data.reference);
                        objForUpdate = instForUpdate.get_node(data.reference);
                        idForUpdate = objForUpdate.id.substring(1);
                        tridForUpdate = objForUpdate.original.templateId;

                        if (objForUpdate.id.substring(0, 1) == "G") {
                            if (objForUpdate.original.templateName != "") {
                                ClearHideInitiativeUpdate();
                                $("#input-update-initiative-title").val(objForUpdate.original.text);
                                GetTemplateDetailsForUpdate(tridForUpdate);
                                $("#prompt-update-initiative").show();

                            }

                        }
                        else {
                            ClearHideTaskUpdate();
                            $("#input-update-task-title").val(objForUpdate.original.text);
                            $("#input-update-task-duedate").val(objForUpdate.data.due_Date);
                            $("#input-update-task-assignedto").val(objForUpdate.data.assignedTo);
                            $("#assignedTo-search-result-user-id").val(objForUpdate.data.assignedTo);
                            $("#prompt-update-task").show();

                        }
                    }
                },
            }

            return items;
        }
    },
    table: {
        columns: [
            { width: "500", header: "Title", headerClass: "customheaderclass0" },
            { width: "300", value: "status", header: "Status", headerClass: "customheaderclass1" },
            { width: "300", value: "assignedTo", header: "Assigned To", headerClass: "customheaderclass2" },
            { width: "300", value: "due_Date", header: "DueDate", headerClass: "customheaderclass3" },
            { width: "300", value: "exdended_date_count", header: "", headerClass: "customheaderclass4" }
        ],
        contextmenu: true,
        resizable: true,
        draggable: true,
    }
});

$('#jstree').on("changed.jstree", function (e, data) {
    if (isRefresh) {
        isRefresh = false;
    }
    else if (getAssignedRefresh) {
        getAssignedRefresh = false;
    }
    else {
        $("#tbl_side_view").hide();
        var selectedTemplateName = data.node.original.templateName;
        var selectedTemplateId = data.node.original.templateId;
        var selectedInitiativeName = data.node.text;

        if (selectedTemplateName != "" && selectedTemplateName != null) {
            GetTemplateDetails(selectedTemplateName, selectedTemplateId, selectedInitiativeName);
        }
        else if (data.node.parents.length != 0) {
            var inList;
            for (var i = 0; i < data.node.parents.length - 1; i++) {
                var getNode = $('#jstree').jstree(true).get_node(data.node.parents[i]);
                selectedTemplateName = getNode.original.templateName;
                selectedTemplateId = getNode.original.templateId;
                if (selectedTemplateName != "" && selectedTemplateName != null) {
                    inList = true;
                    break;
                }
            }
            if (inList) {
                GetTemplateDetails(selectedTemplateName, selectedTemplateId, selectedInitiativeName);
            }
        }
    }
});


//Assigned to me click function
$("#assinged-to-me").click(function () {
    //$('#jstree').jstree('search', "SP7403");
    //$('#jstree').jstree(true).searchColumn("SP7403");
    //getAssignedRefresh = true;
    //var data = {
    //    url: "../Tree/GetTree",
    //    type: "GET",
    //    data: { currentUser },
    //    datatype: "json"
    //};
    //$("#jstree").jstree(true).settings.core.data = data;
    //$("#jstree").jstree(true).refresh();
});


//ClosePrompts
$(".close").click(function () {
    $("#prompt-add-group").hide();
    $("#prompt-add-initiative").hide();
    $("#prompt-add-task").hide();
    $("#prompt-update-initiative").hide();
    $("#prompt-update-task").hide();
    $("#btn-add-task-rout").hide();
    $("#btn-add-task").hide();

    //Remove validation add group
    document.getElementById("input-add-group-title").style.borderColor = "";
    //Remove validation add task
    document.getElementById("input-add-task-title").style.borderColor = "";
    document.getElementById("input-add-task-assignedto").style.borderColor = "";
    document.getElementById("input-add-task-duedate").style.borderColor = "";
    //Remove validation add initiative
    document.getElementById("input-add-initiative-title").style.borderColor = "";
    document.getElementById("input-add-initiative-wgr").style.borderColor = "";
    document.getElementById("input-add-initiative-cgr").style.borderColor = "";
    document.getElementById("input-add-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-add-initiative-pnr").style.borderColor = "";
    document.getElementById("input-add-initiative-eac").style.borderColor = "";
    //Remove validation update initiative
    document.getElementById("input-update-initiative-wgr").style.borderColor = "";
    document.getElementById("input-update-initiative-cgr").style.borderColor = "";
    document.getElementById("input-update-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-update-initiative-pnr").style.borderColor = "";
    document.getElementById("input-update-initiative-eac").style.borderColor = "";
    //Remove validation update task
    document.getElementById("input-update-task-title").style.borderColor = "";
    document.getElementById("input-update-task-duedate").style.borderColor = "";
    document.getElementById("input-update-task-assignedto").style.borderColor = "";

});


//Add Functions
function AddGroup(instForAddNew, objForAddNew, parentIdForAddNew, title) {

    var Template = {
        Name: ""
    };
    var group = {
        Title: title,
        ParentId: parentIdForAddNew,
        CreatedUser: currentUser,
        Template: Template
    };
    var inititiative = null;

    $.ajax({
        url: "../Group/AddGroup",
        type: "POST",
        datatype: "json",
        data: { group, inititiative }
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
    });
}

function AddInitiative(instForAddNew, objForAddNew, parentIdForAddNew, title, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap) {
    var Template = {
        Name: "TTS.TMPL.Initiatives"
    };
    var group = {
        Title: title,
        ParentId: parentIdForAddNew,
        CreatedUser: currentUser,
        Template: Template
    };
    var inititiative = {
        WorkGroupResponsibility: wgr,
        CoreGroupResponsibility: cgr,
        ProjectedDOC: pdoc,
        ProjectedNetRevenue: pnr,
        InitiativeWhyNotCarried: inctaw,
        ProjectedContribution: pc,
        ExpectedAchievedContribution: eac,
        AchievedContribution: ac,
        GAP: gap
    };

    $.ajax({
        url: "../Group/AddGroup",
        type: "POST",
        datatype: "json",
        data: { group, inititiative }
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
    });
}

function AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto) {
    if (isRoutTask) {
        var group = {
            Id: parentIdForAddNew
        };
        var task = {
            Title: title,
            ParentId: null,
            CreatedUser: currentUser,
            Group: group,
            DueDate: duedate,
            AssignTo: assignedto
        };
    }
    else {
        var group = {
            Id: null
        };
        var task = {
            Title: title,
            ParentId: parentIdForAddNew,
            CreatedUser: currentUser,
            Group: group,
            DueDate: duedate,
            AssignTo: assignedto
        };
    }


    $.ajax({
        url: "../Task/AddTask",
        type: "POST",
        datatype: "json",
        data: task
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
    });
}


//Update Functions
function UpdateTask(instForUpdate, objForUpdate, idForUpdate, duedate, assignedto, statusid) {
    var status = {
        Id: statusid
    };
    var task = {
        ID: idForUpdate,
        Duedate: duedate,
        AssignTo: assignedto,
        Status: status
    };

    $.ajax({
        url: "../Task/UpdateTask",
        type: "POST",
        datatype: "json",
        data: task
    }).done(function (data) {
        if (data) {
            instForUpdate.create_node(objForUpdate, {}, "last", function (new_node) {
                instForUpdate.edit(new_node);
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
    });
}

function UpdateInitiative(instForUpdate, objForUpdate, tridForUpdate, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap) {
    var template = {
        Id: tridForUpdate,
        Name: "TTS.TMPL.Initiatives"
    };

    var inititiative = {
        WorkGroupResponsibility: wgr,
        CoreGroupResponsibility: cgr,
        ProjectedDOC: pdoc,
        ProjectedNetRevenue: pnr,
        InitiativeWhyNotCarried: inctaw,
        ProjectedContribution: pc,
        ExpectedAchievedContribution: eac,
        AchievedContribution: ac,
        GAP: gap
    };

    $.ajax({
        url: "../Template/UpdateTemplateDetails",
        type: "POST",
        datatype: "json",
        data: { template, inititiative }
    }).done(function (data) {
        if (data) {
            instForUpdate.create_node(objForUpdate, {}, "last", function (new_node) {
                instForUpdate.edit(new_node);
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
    });
}

function GetTemplateDetails(selectedTemplateName, selectedTemplateId, selectedInitiativeName) {
    var Template = {
        Name: selectedTemplateName,
        Id: selectedTemplateId
    };
    var group = {
        Template: Template
    };

    $.ajax({
        url: "../Template/GetTemplateDetailsByName",
        type: "POST",
        datatype: "json",
        data: group
    }).done(function (data) {
        for (i = 0; i < data.length; i++) {
            var splitStr = data[i].Item.split("_");
            for (var j = 0; j < splitStr.length; j++) {
                splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
            }
            data[i].Item = splitStr.join(' ');
        }
        $("#tbl_side_view_tbl tbody").empty();
        $("#div-initiative-name").empty();
        $("#tbl_side_view").show();
        $("#div-initiative-name").append("<h3 class='panel-title'>" + selectedInitiativeName + "</h3>");
        for (i = 0; i < data.length; i++) {
            if (data[i].Item != 'Id') {
                $('#tbl_side_view_tbl tbody').append("<tr> <td style='vertical-align: top; '>" + data[i].Item + "</td>  <td style='vertical-align: top; '>" + data[i].Value + "</td> </tr>");
            }
        }
    });
}


//Get Function For Update
function GetTemplateDetailsForUpdate(selectedTemplateId) {
    var Template = {
        Name: "TTS.TMPL.Initiatives",
        Id: selectedTemplateId
    };
    var group = {
        Template: Template
    };

    $.ajax({
        url: "../Template/GetTemplateDetailsByName",
        type: "POST",
        datatype: "json",
        data: group
    }).done(function (data) {
        if (typeof data[1] != 'undefined') {
            $("#input-update-initiative-wgr").val(data[1].Value);
            $("#wgr-search-result-user-id").val(data[1].Value);
        }
        if (typeof data[3] != 'undefined') {
            $("#input-update-initiative-cgr").val(data[3].Value);
            $("#cgr-search-result-user-id").val(data[3].Value);
        }
        if (typeof data[5] != 'undefined') { $("#input-update-initiative-pdoc").val(data[5].Value); }
        if (typeof data[4] != 'undefined') { $("#input-update-initiative-pnr").val(data[4].Value); }
        if (typeof data[2] != 'undefined') { $("#input-update-initiative-inctaw").val(data[2].Value); }
        if (typeof data[6] != 'undefined') { $("#input-update-initiative-pc").val(data[6].Value); }
        if (typeof data[7] != 'undefined') { $("#input-update-initiative-eac").val(data[7].Value); }
        if (typeof data[8] != 'undefined') { $("#input-update-initiative-ac").val(data[8].Value); }
        if (typeof data[9] != 'undefined') { $("#input-update-initiative-gap").val(data[9].Value); }
    });
}


//Hide & Clear Prompts
function ClearHideTask() {
    $("#prompt-add-task").hide();
    $("#input-add-task-title").val('');
    $("#input-add-task-duedate").val('');
    $("#input-add-task-assignedto").val('');
    //Remove validation add task
    document.getElementById("input-add-task-duedate").style.borderColor = "";
    document.getElementById("input-add-task-assignedto").style.borderColor = "";
    document.getElementById("input-add-task-title").style.borderColor = "";
}

function ClearHideGroup() {
    $("#prompt-add-group").hide();
    $("#input-add-group-title").val('');
    //Remove validation add group
    document.getElementById("input-add-group-title").style.borderColor = "";
}

function ClearHideInitiative() {
    $("#prompt-add-initiative").hide();
    $("#input-add-initiative-title").val('');
    $("#input-add-initiative-wgr").val('');
    $("#input-add-initiative-cgr").val('');
    $("#input-add-initiative-pdoc").val('');
    $("#input-add-initiative-pnr").val('');
    $("#input-add-initiative-inctaw").val('');
    $("#input-add-initiative-pc").val('');
    $("#input-add-initiative-eac").val('');
    $("#input-add-initiative-ac").val('');
    $("#input-add-initiative-gap").val('');
    //Remove validation add initiative
    document.getElementById("input-add-initiative-title").style.borderColor = "";
    document.getElementById("input-add-initiative-wgr").style.borderColor = "";
    document.getElementById("input-add-initiative-cgr").style.borderColor = "";
    document.getElementById("input-add-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-add-initiative-pnr").style.borderColor = "";
    document.getElementById("input-add-initiative-eac").style.borderColor = "";
}

function ClearHideTaskUpdate() {
    $("#prompt-update-task").hide();
    $("#input-update-task-title").val('');
    $("#input-update-task-duedate").val('');
    $("#input-update-task-assignedto").val('');
    //Remove validation add task
    document.getElementById("input-update-task-duedate").style.borderColor = "";
    document.getElementById("input-update-task-assignedto").style.borderColor = "";
    document.getElementById("input-update-task-title").style.borderColor = "";
}

function ClearHideInitiativeUpdate() {
    $("#prompt-update-initiative").hide();
    $("#input-update-initiative-title").val('');
    $("#input-update-initiative-wgr").val('');
    $("#input-update-initiative-cgr").val('');
    $("#input-update-initiative-pdoc").val('');
    $("#input-update-initiative-pnr").val('');
    $("#input-update-initiative-inctaw").val('');
    $("#input-update-initiative-pc").val('');
    $("#input-update-initiative-eac").val('');
    $("#input-update-initiative-ac").val('');
    $("#input-update-initiative-gap").val('');
    //Remove validation add initiative
    document.getElementById("input-update-initiative-title").style.borderColor = "";
    document.getElementById("input-update-initiative-wgr").style.borderColor = "";
    document.getElementById("input-update-initiative-cgr").style.borderColor = "";
    document.getElementById("input-update-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-update-initiative-pnr").style.borderColor = "";
    document.getElementById("input-update-initiative-eac").style.borderColor = "";
}


// Validate Add Task
function ValidateTaskInputs() {
    var result1 = false;
    if ($("#input-add-task-title").val() == "") {
        document.getElementById("input-add-task-title").style.borderColor = "red";
        result1 = false;
    }
    else {
        document.getElementById("input-add-task-title").style.borderColor = "";
        result1 = true;
    }
    var result2 = false;
    if ($('#input-add-task-assignedto').val() != "") {
        document.getElementById("input-add-task-assignedto").style.borderColor = "";
        result2 = true;
    }
    else {
        document.getElementById("input-add-task-assignedto").style.borderColor = "red";
        result2 = false;
    }
    var result3 = false;
    if ($("#input-add-task-duedate").val() == "") {
        document.getElementById("input-add-task-duedate").style.borderColor = "red";
        result3 = false;
    }
    else {
        document.getElementById("input-add-task-duedate").style.borderColor = "";
        result3 = true;
    }

    if (result1 && result2 && result3) {
        return true;
    }
    else {
        return false;
    }
}

$("#input-add-task-title").keypress(function () {
    document.getElementById("input-add-task-title").style.borderColor = "";
});

$("#input-add-task-assignedto").keypress(function () {
    document.getElementById("input-add-task-assignedto").style.borderColor = "";
});

$("#input-add-task-duedate").change(function () {
    document.getElementById("input-add-task-duedate").style.borderColor = "";
});


// Validate Add Initiative
function ValidateInitiativeInputs() {
    var result1 = false;
    if ($("#input-add-initiative-title").val() == "") {
        document.getElementById("input-add-initiative-title").style.borderColor = "red";
        result1 = false;
    }
    else {
        document.getElementById("input-add-initiative-title").style.borderColor = "";
        result1 = true;
    }
    var result2 = false;
    if ($('#input-add-initiative-wgr').val() != "") {
        document.getElementById("input-add-initiative-wgr").style.borderColor = "";
        result2 = true;
    }
    else {
        document.getElementById("input-add-initiative-wgr").style.borderColor = "red";
        result2 = false;
    }
    var result3 = false;
    if ($("#input-add-initiative-cgr").val() == "") {
        document.getElementById("input-add-initiative-cgr").style.borderColor = "red";
        result3 = false;
    }
    else {
        document.getElementById("input-add-initiative-cgr").style.borderColor = "";
        result3 = true;
    }
    var result4 = false;
    if ($('#input-add-initiative-pdoc').val() != "") {
        document.getElementById("input-add-initiative-pdoc").style.borderColor = "";
        result4 = true;
    }
    else {
        document.getElementById("input-add-initiative-pdoc").style.borderColor = "red";
        result4 = false;
    }
    var result5 = false;
    if ($("#input-add-initiative-pnr").val() == "") {
        document.getElementById("input-add-initiative-pnr").style.borderColor = "red";
        result5 = false;
    }
    else {
        document.getElementById("input-add-initiative-pnr").style.borderColor = "";
        result5 = true;
    }
    var result6 = false;
    if ($("#input-add-initiative-eac").val() == "") {
        document.getElementById("input-add-initiative-eac").style.borderColor = "red";
        result6 = false;
    }
    else {
        document.getElementById("input-add-initiative-eac").style.borderColor = "";
        result6 = true;
    }

    if (result1 && result2 && result3 && result4 && result5 && result6) {
        return true;
    }
    else {
        return false;
    }
}

$("#input-add-initiative-title").keypress(function () {
    document.getElementById("input-add-initiative-title").style.borderColor = "";
});

$("#input-add-initiative-wgr").keypress(function () {
    document.getElementById("input-add-initiative-wgr").style.borderColor = "";
});

$("#input-add-initiative-cgr").keypress(function () {
    document.getElementById("input-add-initiative-cgr").style.borderColor = "";
});

$("#input-add-initiative-pdoc").keypress(function () {
    document.getElementById("input-add-initiative-pdoc").style.borderColor = "";
});

$("#input-add-initiative-pnr").keypress(function () {
    document.getElementById("input-add-initiative-pnr").style.borderColor = "";
});

$("#input-add-initiative-eac").keypress(function () {
    document.getElementById("input-add-initiative-eac").style.borderColor = "";
});


// Validate Add Group
function ValidateGroupInputs() {
    var result = false;
    if ($("#input-add-group-title").val() == "") {
        document.getElementById("input-add-group-title").style.borderColor = "red";
        result = false;
    }
    else {
        document.getElementById("input-add-group-title").style.borderColor = "";
        result = true;
    }
    return result;
}
$("#input-add-group-title").keypress(function () {
    document.getElementById("input-add-group-title").style.borderColor = "";
});


// Validate Update Initiative
function ValidateInitiativeUpdates() {
    var result2 = false;
    if ($('#input-update-initiative-wgr').val() != "") {
        document.getElementById("input-update-initiative-wgr").style.borderColor = "";
        result2 = true;
    }
    else {
        document.getElementById("input-update-initiative-wgr").style.borderColor = "red";
        result2 = false;
    }
    var result3 = false;
    if ($("#input-update-initiative-cgr").val() == "") {
        document.getElementById("input-update-initiative-cgr").style.borderColor = "red";
        result3 = false;
    }
    else {
        document.getElementById("input-update-initiative-cgr").style.borderColor = "";
        result3 = true;
    }
    var result4 = false;
    if ($('#input-update-initiative-pdoc').val() != "") {
        document.getElementById("input-update-initiative-pdoc").style.borderColor = "";
        result4 = true;
    }
    else {
        document.getElementById("input-update-initiative-pdoc").style.borderColor = "red";
        result4 = false;
    }
    var result5 = false;
    if ($("#input-update-initiative-pnr").val() == "") {
        document.getElementById("input-update-initiative-pnr").style.borderColor = "red";
        result5 = false;
    }
    else {
        document.getElementById("input-update-initiative-pnr").style.borderColor = "";
        result5 = true;
    }
    var result6 = false;
    if ($("#input-update-initiative-eac").val() == "") {
        document.getElementById("input-update-initiative-eac").style.borderColor = "red";
        result6 = false;
    }
    else {
        document.getElementById("input-update-initiative-eac").style.borderColor = "";
        result6 = true;
    }

    if (result2 && result3 && result4 && result5 && result6) {
        return true;
    }
    else {
        return false;
    }
}

$("#input-update-initiative-wgr").keypress(function () {
    isChangedAssingedUser = true;
    document.getElementById("input-update-initiative-wgr").style.borderColor = "";
});

$("#input-update-initiative-cgr").keypress(function () {
    isChangedAssingedUser = true;
    document.getElementById("input-update-initiative-cgr").style.borderColor = "";
});

$("#input-update-initiative-pdoc").keypress(function () {
    document.getElementById("input-update-initiative-pdoc").style.borderColor = "";
});

$("#input-update-initiative-pnr").keypress(function () {
    document.getElementById("input-update-initiative-pnr").style.borderColor = "";
});

$("#input-update-initiative-eac").keypress(function () {
    document.getElementById("input-update-initiative-eac").style.borderColor = "";
});


//Validate Update tasks
function ValidateTaskUpdates() {
    var result1 = false;
    if ($("#input-update-task-title").val() == "") {
        document.getElementById("input-update-task-title").style.borderColor = "red";
        result1 = false;
    }
    else {
        document.getElementById("input-update-task-title").style.borderColor = "";
        result1 = true;
    }
    var result2 = false;
    if ($('#input-update-task-assignedto').val() != "") {
        document.getElementById("input-update-task-assignedto").style.borderColor = "";
        result2 = true;
    }
    else {
        document.getElementById("input-update-task-assignedto").style.borderColor = "red";
        result2 = false;
    }
    var result3 = false;
    if ($("#input-update-task-duedate").val() == "") {
        document.getElementById("input-update-task-duedate").style.borderColor = "red";
        result3 = false;
    }
    else {
        document.getElementById("input-update-task-duedate").style.borderColor = "";
        result3 = true;
    }

    if (result1 && result2 && result3) {
        return true;
    }
    else {
        return false;
    }
}

$("#input-update-task-title").keypress(function () {
    document.getElementById("input-update-task-title").style.borderColor = "";
});

$("#input-update-task-duedate").change(function () {
    document.getElementById("input-update-task-duedate").style.borderColor = "";
});

$("#input-update-task-assignedto").keypress(function () {
    isChangedAssingedUser = true;
    document.getElementById("input-update-task-assignedto").style.borderColor = "";
});



