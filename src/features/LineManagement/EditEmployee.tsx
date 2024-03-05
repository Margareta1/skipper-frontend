import { Button, Form, Select, Skeleton } from "antd";
import { useAddEmployeeLanguage } from "../../hooks/useAddEmployeeLanguage";
import { useAddEmployeePositionLevel } from "../../hooks/useAddEmployeePositionLevel";
import { useAddEmployeeSkill } from "../../hooks/useAddEmployeeSkill";
import { AddEmployeeLanguageType } from "../../types/AddEmployeeLanguageType";
import { useGetAllLanguages } from "../../hooks/useGetAllLanguages";
import { useGetAllLanguageLevels } from "../../hooks/useGetAllLanguageLevels";
import { AddEmployeeSkillType } from "../../types/AddEmployeeSkillType";
import { useGetAllGeneralSkills } from "../../hooks/useGetAllGeneralSkills";
import { AddEmployeePositionLevelType } from "../../types/AddEmployeePositionLevelType";
import { useGetAllPositions } from "../../hooks/useGetAllPositions";
import { useGetAllLevelsOfExperience } from "../../hooks/useGetAllLevelfOsExperience";
import { useEffect, useState } from "react";

interface EditEmployeeProps {
  id: string;
  username: string;
}

const EditEmployee: React.FC<EditEmployeeProps> = (props) => {
  const addLanguage = useAddEmployeeLanguage();
  const addSkill = useAddEmployeeSkill();
  const addPositionLevel = useAddEmployeePositionLevel();
  const { data: languages, isLoading: isLoadingLanguages } =
    useGetAllLanguages();
  const { data: languageLevels, isLoading: isLoadingLanguageLevels } =
    useGetAllLanguageLevels();
  const { data: generalSkills, isLoading: isLoadingGeneralSkills } =
    useGetAllGeneralSkills();
  const { data: allPositions, isLoading: isLoadingAllPositions } =
    useGetAllPositions();
  const { data: allLevelsOfEx, isLoading: isLoadingAllLevelsOfEx } =
    useGetAllLevelsOfExperience();
  const [languageForm] = Form.useForm<AddEmployeeLanguageType>();
  const [skillForm] = Form.useForm<AddEmployeeSkillType>();
  const [positionLevelForm] = Form.useForm<AddEmployeePositionLevelType>();
  const [lang, setLang] = useState<any>();
  const [langLev, setLangLev] = useState<any>();
  const [skills, setSkills] = useState<any>();
  const [pos, setPos] = useState<any>();
  const [ex, setEx] = useState<any>();

  useEffect(()=>{
    if(languages){
      setLang(languages)
    }
    if(languageLevels){
      setLangLev(languageLevels);
    }
    if(generalSkills){
      setSkills(generalSkills)
    }
    if(allPositions){
      setPos(allPositions)
    }
    if(allLevelsOfEx){
      setEx(allLevelsOfEx)
    }
  }, [languages, languageLevels, generalSkills, allPositions, allLevelsOfEx])

  const onFinishLanguage = (values: AddEmployeeLanguageType) => {
    values.EmployeeUsername = props.username;
    addLanguage.mutate(values);
  };

  const onFinishSkill = (values: AddEmployeeSkillType) => {
    values.EmployeeUsername = props.username;
    addSkill.mutate(values);
  };
  const onFinishPositionLevel = (values: AddEmployeePositionLevelType) => {
    values.EmployeeUsername = props.username;
    addPositionLevel.mutate(values);
  };

  return isLoadingLanguages ||
    isLoadingLanguageLevels ||
    isLoadingGeneralSkills ||
    isLoadingAllPositions ||
    isLoadingAllLevelsOfEx ? (
    <Skeleton />
  ) : (
    <div>
      <Form onFinish={onFinishLanguage} form={languageForm}>
        <Form.Item
          label="Language"
          name="LanguageId"
          rules={[{ required: true, message: "Please enter the language" }]}
        >
          <Select style={{ width: "200px" }}>
            {lang?.map((data: any) => (
              <Select.Option key={data.id} value={data.id}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Language level"
          name="LanguageLevelId"
          rules={[
            { required: true, message: "Please enter the language level" },
          ]}
        >
          <Select style={{ width: "200px" }}>
            {langLev?.map((data: any) => (
              <Select.Option key={data.id} value={data.id}>
                {data.level}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlignLast: "end" }}>
          <Button
            style={{ alignSelf: "center" }}
            htmlType="submit"
            type="primary"
          >
            Add language
          </Button>
        </Form.Item>
      </Form>

      <Form onFinish={onFinishSkill} form={skillForm}>
        <Form.Item
          label="Skill"
          name="GeneralSkillId"
          rules={[{ required: true, message: "Please enter the skill" }]}
        >
          <Select style={{ width: "200px" }}>
            {skills?.map((data: any) => (
              <Select.Option key={data.id} value={data.id}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlignLast: "end" }}>
          <Button
            style={{ alignSelf: "center" }}
            htmlType="submit"
            type="primary"
          >
            Add skill
          </Button>
        </Form.Item>
      </Form>

      <Form onFinish={onFinishPositionLevel} form={positionLevelForm}>
        <Form.Item
          label="Position"
          name="PositionId"
          rules={[{ required: true, message: "Please enter the position" }]}
        >
          <Select style={{ width: "200px" }}>
            {pos?.map((data: any) => (
              <Select.Option key={data.id} value={data.id}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Level of experience"
          name="LevelOfExperienceId"
          rules={[
            { required: true, message: "Please enter the level of experience" },
          ]}
        >
          <Select style={{ width: "200px" }}>
            {ex?.map((data: any) => (
              <Select.Option key={data.id} value={data.id}>
                {data.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlignLast: "end" }}>
          <Button
            style={{ alignSelf: "center" }}
            htmlType="submit"
            type="primary"
          >
            Add position
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEmployee;
