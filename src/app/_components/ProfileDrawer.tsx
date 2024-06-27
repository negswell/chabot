import { Tabs, Timeline, Text, Group } from "@mantine/core";
import { FC } from "react";
import { Candidates } from "../types";

const tabHeadings = [
  { value: "work", label: "Work Experience" },
  { value: "education", label: "Education" },
];

const ProfileDrawer: FC<{ details: Candidates }> = ({ details }) => {
  return (
    <Tabs defaultValue={tabHeadings[0].value}>
      <Tabs.List>
        {tabHeadings.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="work" p={"lg"}>
        <Timeline color="violet" lineWidth={2} bulletSize={40}>
          {details.workExperience.map((exp) => (
            <Timeline.Item
              key={exp.company}
              title={
                <Text size="md" fw={600}>
                  {exp.role}
                </Text>
              }
            >
              <Group justify="space-between">
                <Text size="sm">{exp.company}</Text>
                <Text size="xs">
                  {exp.locationCity &&
                    `${exp.locationCity} / ${exp.locationCountry}`}
                  &nbsp;
                  {exp.startDate && `(${exp.startDate} - ${exp.endDate})`}
                </Text>
              </Group>
              <Text size="xs" mt={"sm"}>
                {exp.description}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Tabs.Panel>
      <Tabs.Panel value="education" p={"lg"}>
        <Timeline color="violet" lineWidth={2} bulletSize={40}>
          {details.education.map((exp) => (
            <Timeline.Item
              key={exp.school}
              title={
                <Text size="md" fw={600}>
                  {exp.degree} {exp.major}
                </Text>
              }
            >
              <Group justify="space-between" align="center">
                <Text size="sm">{exp.school}</Text>
                {exp.startDate && (
                  <Text size="xs">
                    {exp.startDate} - {exp.endDate}
                  </Text>
                )}
              </Group>
              {exp.grade && <Text size="sm">Grade {exp.grade}</Text>}
            </Timeline.Item>
          ))}
        </Timeline>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileDrawer;
