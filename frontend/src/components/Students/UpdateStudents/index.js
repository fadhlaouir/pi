import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

import {
  fetchAllUsers,
  fetchUser,
  updateUSer,
} from "../../../reducers/User.slice";
import {
  fetchAllSpecialities,
  fetchDepartments,
  selectDepartments,
} from "../../../reducers/Speciality.slice";
import {
  fetchAlllevels,
  fetchLevels,
  selectAlllevels,
  selectLevels,
} from "../../../reducers/Level.slice";
import {
  fetchAllGroups,
  selectAllGroups,
  selectGroups,
} from "../../../reducers/Group.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../../reducers/Department.slice";

function UpdateStudents({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const levels = useSelector(selectAlllevels);
  const departments = useSelector(selectAllDepartments);
  const groups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllUsers());
    dispatch(fetchAllGroups());
    dispatch(fetchAlllevels());
  }, []);

  const onClickSubmit = (entry) => {
    console.log("entry", entry);
    dispatch(
      updateUSer({
        id: record.id,
        fields: {
          ...entry,
        },
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Instructor",
          description: "Updated successfully",
        });
        setShowModal(!showModal);
        dispatch(fetchUser(record.id));
      })
      .catch(() =>
        notification.error({
          message: "Instructor",
          description: "An error occured",
        })
      );
  };
  const [form] = Form.useForm();

  // Get Level by selected departments
  const getDepartmentSelectedField = form.getFieldValue("department");
  const levelBySelectedDepartment = departments.find(
    (dep) => dep.id === getDepartmentSelectedField
  );

  // Get Group by selected levels
  const getLevelSelectedField = form.getFieldValue("level");
  const getGoupBySelectedLevel = groups.filter(
    (gr) =>
      gr.level.id === getLevelSelectedField &&
      gr.department?.id === getDepartmentSelectedField
  );

  console.log("record", record);

  const FormFields = [
    {
      key: "username",
      label: "username",
      placeholder: "username",
      initialValue: record?.username,
      rules: [
        {
          required: true,
          message: "username is required",
        },
      ],
    },
    {
      key: "email",
      label: "Email",
      placeholder: "email",
      initialValue: record?.email,
      disabled: true,
      rules: [
        {
          required: true,
          message: "email is required",
        },
      ],
    },
    {
      key: "department",
      label: "departments",
      placeholder: "departments",
      widget: "select",
      initialValue: record?.department,
      options: departments?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "departments is required",
        },
      ],
    },
    {
      key: "level",
      label: "level",
      placeholder: "level",
      widget: "select",
      initialValue: record?.level,
      options: levelBySelectedDepartment?.levels.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "level is required",
        },
      ],
    },
    {
      key: "groupes",
      label: "Group",
      placeholder: "Group",

      widget: "select",
      options: getGoupBySelectedLevel?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Group is required",
        },
      ],
    },
  ];

  // force update form
  const forceUpdate = FormBuilder.useForceUpdate();

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
        Edit
      </Button>
      <Modal
        style={{ minHeight: "1500px !important" }}
        title="Update"
        width={1000}
        visible={showModal}
        maskClosable={false}
        footer={null}
        closable
        destroyOnClose
        onCancel={() => setShowModal(!showModal)}
      >
        <Form
          layout="horizontal"
          onFinish={onClickSubmit}
          onValuesChange={forceUpdate}
          form={form}
        >
          <FormBuilder form={form} meta={FormFields} />
          {!onlyFormItems && (
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}

UpdateStudents.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateStudents;
