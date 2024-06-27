import {
  Card,
  Group,
  Text,
  Button,
  Badge,
  Avatar,
  Stack,
  Drawer,
} from "@mantine/core";
import { Candidates } from "../types";
import { FC } from "react";
import { Mail } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileDrawer from "./ProfileDrawer";

const EmploymentCard: FC<{
  title: string;
  salary: string;
  availability: string;
}> = ({ title, salary, availability }) => {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Stack>
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Text size="sm">{availability}</Text>
        <Text fw={600} size="sm">
          ${salary} / month
        </Text>
      </Stack>
    </Card>
  );
};

const ProfileCard: FC<{ details: Candidates }> = ({ details }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const location = details?.location ? JSON.parse(details?.location) : {};
  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <Group mt="md" align="center" justify="space-between">
        <Group gap={"md"}>
          <Avatar
            src={null}
            radius={"xl"}
            size={"md"}
            variant="filled"
            color="black"
            alt="no image here"
          />
          <Text fw={500}>
            {details.name} | {location?.city} / {location?.country}
          </Text>
        </Group>
        <Button
          radius="lg"
          color="black"
          variant="filled"
          onClick={() => open()}
        >
          View Profile
        </Button>
      </Group>
      <Group align="center" mt="md">
        <Text size="md" fw={500}>
          {details.phone}
        </Text>
        <a
          href={`mailto:${details.email}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Mail />
        </a>
      </Group>
      <Group justify="space-between">
        <Stack mt={"md"}>
          <Text fw={600} size="sm">
            Expert in
          </Text>
          <Group gap={"sm"}>
            {details.skills.map((skill) => (
              <Badge
                key={skill}
                radius={"md"}
                variant="light"
                color="black"
                size="xs"
                p={"sm"}
              >
                {skill}{" "}
              </Badge>
            ))}
          </Group>
        </Stack>
        <Stack mt={"md"}>
          <Text fw={600} size="sm">
            Commitment
          </Text>
          <Group gap={"sm"}>
            {details.fullTime && (
              <Badge
                radius={"md"}
                variant="light"
                color="black"
                size="xs"
                p={"sm"}
              >
                Full Time
              </Badge>
            )}
            {details.partTime && (
              <Badge
                radius={"md"}
                variant="light"
                color="black"
                size="xs"
                p={"sm"}
              >
                Part Time
              </Badge>
            )}
          </Group>
        </Stack>
      </Group>
      <Group gap={"md"} mt={"lg"} justify="center" wrap="nowrap">
        {details.fullTime && details.fullTimeSalary && (
          <EmploymentCard
            title="Full Time"
            salary={details.fullTimeSalary}
            availability={`Can start 40+ hours / week in ${details.fullTimeAvailability} weeks`}
          />
        )}
        {details.partTime && details.partTimeSalary && (
          <EmploymentCard
            title="Part Time"
            salary={details.partTimeSalary}
            availability={`Can start 20+ hours / week in ${details.partTimeAvailability} weeks`}
          />
        )}
      </Group>
      <Drawer
        radius="md"
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} size="md">
            Profile Details
          </Text>
        }
        position="right"
        size={"lg"}
      >
        <ProfileDrawer details={details} />
      </Drawer>
    </Card>
  );
};

export default ProfileCard;
