var currentUser = commonStrings.CurrentUser;
var currentuserName;
var isRefresh,
    isRoutTask;
var getAssignedRefresh,
    getOverDueRefresh;
var isAssignedToUserForTask,
    isAssignedToUserForWgr,
    isAssignedToUserForCgr,
    isUpdateAssingedUserTask,
    isUpdateAssingedUserWgr,
    isUpdateAssingedUserCgr;
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
    document.getElementById('user-account-name-navbar').innerHTML = currentuserName;
});

//#region Date Picker Function

$(function () {
    $("#input-add-task-duedate").datepicker();
    $("#input-add-initiative-sd").datepicker();
    $("#input-add-initiative-ed").datepicker();
    $("#input-add-initiative-efd").datepicker();
    $("#input-add-initiative-etd").datepicker();
    $("#input-update-task-duedate").datepicker();
    $("#input-update-initiative-sd").datepicker();
    $("#input-update-initiative-ed").datepicker();
    $("#input-update-initiative-efd").datepicker();
    $("#input-update-initiative-etd").datepicker();
});

//#endregion

//#region Tree

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
        items: function (node) { // Could be an object directly
            var routLabItems = {
                "create": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Create",
                    "icon": "fa fa-plus",
                    "action": function (data) {
                        instForAddNew = $.jstree.reference(data.reference);
                        objForAddNew = instForAddNew.get_node(data.reference);
                        parentIdForAddNew = objForAddNew.id.substring(1);

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
                    "icon": "fa fa-pencil",
                    "action": function (data) {
                        instForUpdate = $.jstree.reference(data.reference);
                        objForUpdate = instForUpdate.get_node(data.reference);
                        idForUpdate = objForUpdate.id.substring(1);
                        tridForUpdate = objForUpdate.original.templateId;
                        var templateName = "TTS.TMPL.Initiatives";

                        if (objForUpdate.id.substring(0, 1) == "G") {
                            if (objForUpdate.original.templateName != "") {
                                ClearHideInitiativeUpdate();
                                $("#input-update-initiative-title").val(objForUpdate.original.text);
                                GetTemplateDetailsForUpdate(tridForUpdate, templateName);
                                $("#prompt-update-initiative").show();

                            }

                        }
                        else {
                            ClearHideTaskUpdate();
                            $("#input-update-task-title").val(objForUpdate.original.text);
                            $("#input-update-task-duedate").val(objForUpdate.data.due_Date);
                            $("#input-update-task-actual-cost").val(objForUpdate.data.actual_cost);
                            if (objForUpdate.data.status == "Open") { $("#input-update-task-status").prop('checked', true).change(); } else { $("#input-update-task-status").prop('checked', false).change(); }
                            $("#input-update-task-assignedto").val(objForUpdate.data.username);
                            $("#assignedTo-search-result-user-id").val(objForUpdate.data.assignedTo);
                            $("#prompt-update-task").show();

                        }
                    }
                },
            }

            var generalItems = {
                "createGroup": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Group",
                    "icon": "fa fa-plus",
                    "action": function (data) {
                        instForAddNew = $.jstree.reference(data.reference);
                        objForAddNew = instForAddNew.get_node(data.reference);
                        parentIdForAddNew = objForAddNew.id.substring(1);

                        ClearHideGroup();
                        $("#prompt-add-group").show();

                    }
                },
                "createItem": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Item",
                    "icon": "fa fa-plus",
                    "action": function (data) {
                        instForAddNew = $.jstree.reference(data.reference);
                        objForAddNew = instForAddNew.get_node(data.reference);
                        parentIdForAddNew = objForAddNew.id.substring(1);

                        ClearHideItem();
                        $("#prompt-add-item").show();
                    }
                },
                "createTask": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Task",
                    "icon": "fa fa-plus",
                    "action": function (data) {
                        instForAddNew = $.jstree.reference(data.reference);
                        objForAddNew = instForAddNew.get_node(data.reference);
                        parentIdForAddNew = objForAddNew.id.substring(1);

                        if (objForAddNew.id.substring(0, 1) == "G") {
                            if (objForAddNew.original.templateName != "") {
                                ClearHideTask();
                                $("#add-task-div-actual-cost").hide();
                                $("#btn-add-task-rout").show();
                                $("#prompt-add-task").show();

                            }
                        }
                        else {
                            ClearHideTask();
                            $("#add-task-div-actual-cost").hide();
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
                    "icon": "fa fa-pencil",
                    "action": function (data) {
                        instForUpdate = $.jstree.reference(data.reference);
                        objForUpdate = instForUpdate.get_node(data.reference);
                        idForUpdate = objForUpdate.id.substring(1);
                        tridForUpdate = objForUpdate.original.templateId;
                        var templateName = "TTS.TMPL.Item";

                        if (objForUpdate.id.substring(0, 1) == "G") {
                            if (objForUpdate.original.templateName != "") {
                                //ClearHideItem();
                                //$("#input-update-item-title").val(objForUpdate.original.text);
                                //GetTemplateDetailsForUpdate(tridForUpdate, templateName);
                                //$("#prompt-update-item").show();

                            }

                        }
                        else {
                            ClearHideTaskUpdate();
                            $("#update-task-div-actual-cost").hide();
                            $("#input-update-task-title").val(objForUpdate.original.text);
                            $("#input-update-task-duedate").val(objForUpdate.data.due_Date);
                            if (objForUpdate.data.status == "Open") { $("#input-update-task-status").prop('checked', true).change(); } else { $("#input-update-task-status").prop('checked', false).change(); }
                            $("#input-update-task-assignedto").val(objForUpdate.data.username);
                            $("#assignedTo-search-result-user-id").val(objForUpdate.data.assignedTo);
                            $("#prompt-update-task").show();

                        }
                    }
                },
            }

            if (node.id.substring(0, 1) == "G") {
                if (node.original.templateName == "") {
                    delete routLabItems.update;
                    delete generalItems.update;
                    delete generalItems.createTask;
                }
                else {
                    delete generalItems.createGroup;
                    delete generalItems.createItem;
                    delete generalItems.update;
                }
            }
            else {
                delete generalItems.createGroup;
                delete generalItems.createItem;
            }

            return generalItems;
        }
    },
    table: {
        columns: [
            { width: "500", header: "Title", headerClass: "customheaderclass0" },
            { width: "300", value: "status", header: "Status", headerClass: "customheaderclass1" },
            { width: "300", value: "username", header: "Assigned To", headerClass: "customheaderclass2" },
            { width: "300", value: "due_Date", header: "DueDate", headerClass: "customheaderclass3" },
            { width: "300", value: "exdended_date_count", header: "", headerClass: "customheaderclass4" }
        ],
    }
});


$('#jstree').on("loaded.jstree", function (event, data) {
    var node = $("#jstree").jstree().get_node('G1');
    $("#jstree").jstree(true).delete_node(node);
});
//Js tree chnge event
$('#jstree').on("changed.jstree", function (e, data) {
    var node = $("#jstree").jstree().get_node('G1');
    $("#jstree").jstree(true).delete_node(node);

    if (isRefresh) {
        isRefresh = false;
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
                selectedInitiativeName = getNode.text;
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

//Tree data
function TreeData() {
    var data;
    var task = {};
    if (getAssignedRefresh) {
        task = {
            AssignTo: currentUser
        };
    }
    else if (getOverDueRefresh) {
        task = {
            IsGetOverdue: true
        };
    }

    data = {
        url: "../Tree/GetTree",
        type: "POST",
        data: task,
        datatype: "json"
    };

    return data;
}

//#endregion

//#region Insert Functions

//#region Group

$("#btn-add-group").click(function () {
    if (ValidateGroupInputs()) {
        var title = $("#input-add-group-title").val();
        AddGroup(instForAddNew, objForAddNew, parentIdForAddNew, title);
        ClearHideGroup();
    }
});

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

    var item = null;

    $.ajax({
        url: "../Group/AddGroup",
        type: "POST",
        datatype: "json",
        data: { group, inititiative, item }
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
        else {
            alert("Process not complete due to system issue. Please try again!!!")
        }
    });
}

//#region Validate Add Group
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

function ClearHideGroup() {
    $("#prompt-add-group").hide();
    $("#input-add-group-title").val('');
    //Remove validation add group
    document.getElementById("input-add-group-title").style.borderColor = "";
}
//#endregion

//#endregion

//#region Item

$("#btn-add-item").click(function () {
    if (ValidateItemInputs()) {
        var title = $("#input-add-item-title").val(),
            details = $("#input-add-item-dtl").val();
        AddItem(instForAddNew, objForAddNew, parentIdForAddNew, title, details);
        ClearHideItem();
    }
});

function AddItem(instForAddNew, objForAddNew, parentIdForAddNew, title, details) {
    var Template = {
        Name: "TTS.TMPL.Item"
    };
    var group = {
        Title: title,
        ParentId: parentIdForAddNew,
        CreatedUser: currentUser,
        Template: Template
    };
    var inititiative = null;

    var item = {
        Details: details
    };

    $.ajax({
        url: "../Group/AddGroup",
        type: "POST",
        datatype: "json",
        data: { group, inititiative, item }
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
        else {
            alert("Process not complete due to system issue. Please try again!!!")
        }
    });
}

//#region Validate Add Item
function ValidateItemInputs() {
    var result = false;
    if ($("#input-add-item-title").val() == "") {
        document.getElementById("input-add-item-title").style.borderColor = "red";
        result = false;
    }
    else {
        document.getElementById("input-add-item-title").style.borderColor = "";
        result = true;
    }
    return result;
}

$("#input-add-item-title").keypress(function () {
    document.getElementById("input-add-item-title").style.borderColor = "";
});

function ClearHideItem() {
    $("#prompt-add-item").hide();
    $("#input-add-item-title").val('');
    $("#input-add-item-dtl").val('');
    //Remove validation add group
    document.getElementById("input-add-group-title").style.borderColor = "";
}
//#endregion

//#endregion

//#region Initiative

$("#btn-add-initiative").click(function () {
    if (ValidateInitiativeInputs()) {
        if (isAssignedToUserForWgr && isAssignedToUserForCgr) {
            var title = $("#input-add-initiative-title").val(),
                wgr = $("#wgr-search-result-user-id").val(),
                cgr = $("#cgr-search-result-user-id").val(),
                pdoc = $("#input-add-initiative-pdoc").val(),
                pnr = $("#input-add-initiative-pnr").val(),
                inctaw = $("#input-add-initiative-inctaw").val(),
                pc = $("#input-add-initiative-pc").val(),
                eac = $("#input-add-initiative-eac").val(),
                ac = $("#input-add-initiative-ac").val(),
                gap = $("#input-add-initiative-gap").val(),
                ec = $("#input-add-initiative-ec").val(),
                er = $("#input-add-initiative-er").val(),
                sd = $("#input-add-initiative-sd").val(),
                ed = $("#input-add-initiative-ed").val(),
                efd = $("#input-add-initiative-efd").val(),
                etd = $("#input-add-initiative-etd").val();
            AddInitiative(instForAddNew, objForAddNew, parentIdForAddNew, title, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap, ec, er, sd, ed, efd, etd);
            ClearHideInitiative();
            isAssignedToUserForWgr = false;
            isAssignedToUserForCgr = false;
        }
        else {
            alert("Please SEARCH persons you want assigne responsibility !!!");
        }
    }
});

function AddInitiative(instForAddNew, objForAddNew, parentIdForAddNew, title, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap, ec, er, sd, ed, efd, etd) {
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
        GAP: gap,
        EstimatedCost: ec,
        EstimatedRevenue: er,
        StartDate: sd,
        EndDate: ed,
        EffectiveFromDate: efd,
        EffectiveToDate: etd
    };

    var item = null;

    $.ajax({
        url: "../Group/AddGroup",
        type: "POST",
        datatype: "json",
        data: { group, inititiative, item }
    }).done(function (data) {
        if (data) {
            instForAddNew.create_node(objForAddNew, {}, "last", function (new_node) {
                instForAddNew.edit(new_node);
                if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
        else {
            alert("Process not complete due to system issue. Please try again!!!")
        }
    });
}

$("#btn-add-initiative-wgr-search-user").click(function () {
    var userid = $("#input-add-initiative-wgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUserForWgr = true;
        $("#input-add-initiative-wgr").val(data);
        $("#wgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-add-initiative-cgr-search-user").click(function () {
    var userid = $("#input-add-initiative-cgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUserForCgr = true;
        $("#input-add-initiative-cgr").val(data);
        $("#cgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

//#region Validate Add Initiative
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
//#endregion

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
    $("#input-add-initiative-ec").val('');
    $("#input-add-initiative-er").val('');
    $("#input-add-initiative-sd").val('');
    $("#input-add-initiative-ed").val('');
    $("#input-add-initiative-efd").val('');
    $("#input-add-initiative-etd").val('');
    //Remove validation add initiative
    document.getElementById("input-add-initiative-title").style.borderColor = "";
    document.getElementById("input-add-initiative-wgr").style.borderColor = "";
    document.getElementById("input-add-initiative-cgr").style.borderColor = "";
    document.getElementById("input-add-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-add-initiative-pnr").style.borderColor = "";
    document.getElementById("input-add-initiative-eac").style.borderColor = "";
}

//#endregion

//#region Task

$("#btn-add-task-rout").click(function () {
    if (ValidateTaskInputs()) {
        if (isAssignedToUserForTask) {
            var title = $("#input-add-task-title").val(),
                duedate = $("#input-add-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val(),
                actualCost = $("#input-add-task-actual-cost").val();

            isRoutTask = true;
            AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto, actualCost);
            ClearHideTask();
            $("#btn-add-task-rout").hide();
            isAssignedToUserForTask = false;
        }
        else {
            alert("Please SEARCH person you want assigne task !!!");
        }
    }
});

$("#btn-add-task").click(function () {
    if (ValidateTaskInputs()) {
        if (isAssignedToUserForTask) {
            var title = $("#input-add-task-title").val(),
                duedate = $("#input-add-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val(),
                actualCost = $("#input-add-task-actual-cost").val();
            isRoutTask = false;
            AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto, actualCost);
            ClearHideTask();
            $("#btn-add-task").hide();
            isAssignedToUserForTask = false;
        }
        else {
            alert("Please SEARCH person you want assigne task !!!");
        }
    }
});

function AddTask(isRoutTask, instForAddNew, objForAddNew, parentIdForAddNew, title, duedate, assignedto, actualCost) {
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
            AssignTo: assignedto,
            ActualCost: actualCost
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
            AssignTo: assignedto,
            ActualCost: actualCost
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
                if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
                $("#jstree").jstree(true).refresh();
                isRefresh = true;
            });
        }
        else {
            alert("Process not complete due to system issue. Please try again!!!")
        }
    });
}

//Search users click functions
$("#btn-add-task-assignedto-search-user").click(function () {
    var userid = $("#input-add-task-assignedto").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUserForTask = true;
        $("#input-add-task-assignedto").val(data);
        $("#assignedTo-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

//#region Validate Add Task
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
//#endregion

function ClearHideTask() {
    $("#prompt-add-task").hide();
    $("#input-add-task-title").val('');
    $("#input-add-task-duedate").val('');
    $("#input-add-task-assignedto").val('');
    $("#input-add-task-actual-cost").val('');
    //Remove validation add task
    document.getElementById("input-add-task-duedate").style.borderColor = "";
    document.getElementById("input-add-task-assignedto").style.borderColor = "";
    document.getElementById("input-add-task-title").style.borderColor = "";
}

//#endregion

//#endregion

//#region Update Functions

//#region Task
$("#btn-update-task").click(function () {
    if (!isUpdateAssingedUserTask) {
        isAssignedToUserForTask = true;
    }
    if (ValidateTaskUpdates()) {
        if (isAssignedToUserForTask) {
            var duedate = $("#input-update-task-duedate").val(),
                assignedto = $("#assignedTo-search-result-user-id").val(),
                actualCost = $("#input-update-task-actual-cost").val(),
                status;
            if ($("#input-update-task-status").is(':checked')) {
                status = 1;
            } else {
                status = 2;
            }
            UpdateTask(idForUpdate, duedate, assignedto, status, actualCost);
            ClearHideTaskUpdate();
            isUpdateAssingedUserTask = false;
            isAssignedToUserForTask = false;
        }
        else {
            alert("Please SEARCH person you want assigne task !!!");
        }
    }
});

$("#btn-update-task-assignedto-search-user").click(function () {
    var userid = $("#input-update-task-assignedto").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUserForTask = true;
        $("#input-update-task-assignedto").val(data);
        $("#assignedTo-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});

$("#btn-update-task-assignedto-edit-user").click(function () {
    $("#input-update-task-assignedto").val('');
    $("#input-update-task-assignedto").prop("disabled", false);
    $("#btn-update-task-assignedto-search-user").prop("disabled", false);
    isUpdateAssingedUserTask = true;
});

function UpdateTask(idForUpdate, duedate, assignedto, statusid, actualCost) {
    var status = {
        Id: statusid
    };
    var task = {
        ID: idForUpdate,
        Duedate: duedate,
        AssignTo: assignedto,
        Status: status,
        ActualCost: actualCost
    };

    $.ajax({
        url: "../Task/UpdateTask",
        type: "POST",
        datatype: "json",
        data: task
    }).done(function (data) {
        if (data) {
            if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
            $("#jstree").jstree(true).refresh();
            $("#input-update-task-assignedto").prop("disabled", true);
            $("#btn-update-task-assignedto-search-user").prop("disabled", true);
            isRefresh = true;
        }
        else {
            alert("Update not complete due to system issue. Please try again!!!")
        }
    });
}

//#region Validate Update tasks
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
    document.getElementById("input-update-task-assignedto").style.borderColor = "";
});
//#endregion

function ClearHideTaskUpdate() {
    $("#prompt-update-task").hide();
    $("#input-update-task-title").val('');
    $("#input-update-task-duedate").val('');
    $("#input-update-task-assignedto").val('');
    $("#input-update-task-actual-cost").val('');
    //Remove validation add task
    document.getElementById("input-update-task-duedate").style.borderColor = "";
    document.getElementById("input-update-task-assignedto").style.borderColor = "";
    document.getElementById("input-update-task-title").style.borderColor = "";
}

//#endregion

//#region Initiative

//Update click functions
$("#btn-update-initiative").click(function () {
    if (!isUpdateAssingedUserWgr) {
        isAssignedToUserForWgr = true;
    }
    if (!isUpdateAssingedUserCgr) {
        isAssignedToUserForCgr = true;
    }
    if (ValidateInitiativeUpdates()) {
        if (isAssignedToUserForWgr && isAssignedToUserForCgr) {
            var wgr = $("#wgr-search-result-user-id").val(),
                cgr = $("#cgr-search-result-user-id").val(),
                pdoc = $("#input-update-initiative-pdoc").val(),
                pnr = $("#input-update-initiative-pnr").val(),
                inctaw = $("#input-update-initiative-inctaw").val(),
                pc = $("#input-update-initiative-pc").val(),
                eac = $("#input-update-initiative-eac").val(),
                ac = $("#input-update-initiative-ac").val(),
                gap = $("#input-update-initiative-gap").val(),
                ec = $("#input-update-initiative-ec").val(),
                er = $("#input-update-initiative-er").val(),
                sd = $("#input-update-initiative-sd").val(),
                ed = $("#input-update-initiative-ed").val(),
                efd = $("#input-update-initiative-efd").val(),
                etd = $("#input-update-initiative-etd").val();
            UpdateInitiative(tridForUpdate, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap, ec, er, sd, ed, efd, etd);
            ClearHideInitiativeUpdate();
            isUpdateAssingedUserWgr = false;
            isUpdateAssingedUserCgr = false;
            isAssignedToUserForWgr = false;
            isAssignedToUserForCgr = false;
        }
        else {
            alert("Please SEARCH persons you want assigne responsibility !!!");
        }
    }
});

$("#btn-update-initiative-wgr-search-user").click(function () {
    var userid = $("#input-update-initiative-wgr").val();
    var data = GetADUserNameById(userid);
    if (data) {
        isAssignedToUserForWgr = true;
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
        isAssignedToUserForCgr = true;
        $("#input-update-initiative-cgr").val(data);
        $("#cgr-search-result-user-id").val(userid);
    }
    else {
        alert("No such user in AD. Please try again !!!")
    }
});


//Edit user update click functions
$("#btn-update-initiative-wgr-edit-user").click(function () {
    $("#input-update-initiative-wgr").val('');
    $("#input-update-initiative-wgr").prop("disabled", false);
    $("#btn-update-initiative-wgr-search-user").prop("disabled", false);
    isUpdateAssingedUserWgr = true;
});

$("#btn-update-initiative-cgr-edit-user").click(function () {
    $("#input-update-initiative-cgr").val('');
    $("#input-update-initiative-cgr").prop("disabled", false);
    $("#btn-update-initiative-cgr-search-user").prop("disabled", false);
    isUpdateAssingedUserCgr = true;
});


//Update Functions
function UpdateInitiative(tridForUpdate, wgr, cgr, pdoc, pnr, inctaw, pc, eac, ac, gap, ec, er, sd, ed, efd, etd) {
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
        GAP: gap,
        EstimatedCost: ec,
        EstimatedRevenue: er,
        StartDate: sd,
        EndDate: ed,
        EffectiveFromDate: efd,
        EffectiveToDate: etd
    };

    $.ajax({
        url: "../Template/UpdateTemplateDetails",
        type: "POST",
        datatype: "json",
        data: { template, inititiative }
    }).done(function (data) {
        if (data) {
            if (getAssignedRefresh || getOverDueRefresh) { $("#jstree").jstree(true).settings.core.data = TreeData(); }
            $("#jstree").jstree(true).refresh();
            $("#input-update-initiative-wgr").prop("disabled", true);
            $("#input-update-initiative-cgr").prop("disabled", true);
            $("#btn-update-initiative-wgr-search-user").prop("disabled", true);
            $("#btn-update-initiative-cgr-search-user").prop("disabled", true);
            isRefresh = true;
        }
        else {
            alert("Update not complete due to system issue. Please try again!!!")
        }
    });
}


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
    document.getElementById("input-update-initiative-wgr").style.borderColor = "";
});

$("#input-update-initiative-cgr").keypress(function () {
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
    $("#input-update-initiative-ec").val('');
    $("#input-update-initiative-er").val('');
    $("#input-update-initiative-sd").val('');
    $("#input-update-initiative-ed").val('');
    $("#input-update-initiative-efd").val('');
    $("#input-update-initiative-etd").val('');
    //Remove validation add initiative
    document.getElementById("input-update-initiative-title").style.borderColor = "";
    document.getElementById("input-update-initiative-wgr").style.borderColor = "";
    document.getElementById("input-update-initiative-cgr").style.borderColor = "";
    document.getElementById("input-update-initiative-pdoc").style.borderColor = "";
    document.getElementById("input-update-initiative-pnr").style.borderColor = "";
    document.getElementById("input-update-initiative-eac").style.borderColor = "";
}

//#endregion

//#endregion

//#region Get Functions

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
            if (data[i].Item == 'Work Group Responsibility') { data[i].Value = GetADUserNameById(data[i].Value); }
            if (data[i].Item == 'Core Group Responsibility') { data[i].Value = GetADUserNameById(data[i].Value); }
            if (data[i].Item != 'Id') {
                $('#tbl_side_view_tbl tbody').append("<tr> <td style='vertical-align: top; '>" + data[i].Item + "</td> <td style='vertical-align: inherit; '> : </td>  <td style='vertical-align: top; '>" + data[i].Value + "</td> </tr>");
            }
        }
    });
}

function GetTemplateDetailsForUpdate(selectedTemplateId, templateName) {
    var Template = {
        Name: templateName,
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
        for (var i = 1; i < data.length; i++) {
            switch (data[i].Item) {
                case "work_group_responsibility":
                    $("#input-update-initiative-wgr").val(GetADUserNameById(data[i].Value));
                    $("#wgr-search-result-user-id").val(data[i].Value);
                    break;
                case "core_group_responsibility":
                    $("#input-update-initiative-cgr").val(GetADUserNameById(data[i].Value));
                    $("#cgr-search-result-user-id").val(data[i].Value);
                    break;
                case "projected_DOC":
                    $("#input-update-initiative-pdoc").val(data[i].Value);
                    break;
                case "projected_net_revenue":
                    $("#input-update-initiative-pnr").val(data[i].Value);
                    break;
                case "not_carried_through_and_why":
                    $("#input-update-initiative-inctaw").val(data[i].Value);
                    break;
                case "projected_contribution_1":
                    $("#input-update-initiative-pc").val(data[i].Value);
                    break;
                case "expected_achieved_contribution_1":
                    $("#input-update-initiative-eac").val(data[i].Value);
                    break;
                case "achieved_contribution_1":
                    $("#input-update-initiative-ac").val(data[i].Value);
                    break;
                case "GAP":
                    $("#input-update-initiative-gap").val(data[i].Value);
                    break;
                case "estimated_cost":
                    $("#input-update-initiative-ec").val(data[i].Value);
                    break;
                case "estimated_revenue":
                    $("#input-update-initiative-er").val(data[i].Value);
                    break;
                case "start_date":
                    $("#input-update-initiative-sd").val(data[i].Value);
                    break;
                case "end_date":
                    $("#input-update-initiative-ed").val(data[i].Value);
                    break;
                case "effective_from_date":
                    $("#input-update-initiative-efd").val(data[i].Value);
                    break;
                case "effective_to_date":
                    $("#input-update-initiative-etd").val(data[i].Value);
                    break;
            }
        }
    });
}

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

//#endregion

//#region Side-Menu Functions
//Assigned to me click function
$("#btn-assinged-to-me").click(function () {
    $("#tbl_side_view").hide();
    getOverDueRefresh = false;
    getAssignedRefresh = true;
    isRefresh = true;
    $("#jstree").jstree(true).settings.core.data = TreeData();
    $("#jstree").jstree(true).refresh();
    $("#btn-assinged-to-me").addClass("active");
    $("#btn-all-tasks").removeClass("active");
    $("#btn-overdue-tasks").removeClass("active");
});

//All tasks click function
$("#btn-all-tasks").click(function () {
    $("#tbl_side_view").hide();
    getAssignedRefresh = false;
    getOverDueRefresh = false;
    isRefresh = true;
    $("#jstree").jstree(true).settings.core.data = TreeData();
    $("#jstree").jstree(true).refresh();
    $("#btn-all-tasks").addClass("active");
    $("#btn-assinged-to-me").removeClass("active");
    $("#btn-overdue-tasks").removeClass("active");
});

//OverDue tasks click function
$("#btn-overdue-tasks").click(function () {
    $("#tbl_side_view").hide();
    getAssignedRefresh = false;
    getOverDueRefresh = true;
    isRefresh = true;
    $("#jstree").jstree(true).settings.core.data = TreeData();
    $("#jstree").jstree(true).refresh();
    $("#btn-overdue-tasks").addClass("active");
    $("#btn-all-tasks").removeClass("active");
    $("#btn-assinged-to-me").removeClass("active");
});
//#endregion

//#region Close Prompts
$(".close").click(function () {
    $("#prompt-add-group").hide();
    $("#prompt-add-item").hide();
    $("#prompt-add-initiative").hide();
    $("#prompt-add-task").hide();
    $("#prompt-update-initiative").hide();
    $("#prompt-update-task").hide();
    $("#btn-add-task-rout").hide();
    $("#btn-add-task").hide();

    $("#input-update-initiative-wgr").prop("disabled", true);
    $("#input-update-initiative-cgr").prop("disabled", true);
    $("#input-update-task-assignedto").prop("disabled", true);

    $("#btn-update-initiative-wgr-search-user").prop("disabled", true);
    $("#btn-update-initiative-cgr-search-user").prop("disabled", true);
    $("#btn-update-task-assignedto-search-user").prop("disabled", true);


    //Remove validation add group
    document.getElementById("input-add-group-title").style.borderColor = "";
    //Remove validation add item
    document.getElementById("input-add-item-title").style.borderColor = "";
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
//#endregion