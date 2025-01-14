"use server";
import * as Name from "w3name";

export const publish = async (
  content: string
): Promise<{ name: string; key: Uint8Array }> => {
  const name = await Name.create();

  const revision = await Name.v0(name, content);
  await Name.publish(revision, name.key);

  return {
    name: name.toString(),
    key: name.key.bytes,
  };
};

export const update = async (ipns: string, keyStr: string, content: string) => {
  const name = Name.parse(ipns);
  const revision = await Name.resolve(name);

  const nextRevision = await Name.increment(revision, content);

  if (!keyStr) {
    return;
  }
  const key = new Uint8Array(JSON.parse(keyStr));

  const name2 = await Name.from(key);
  await Name.publish(nextRevision, name2.key);
};

export const resolve = async () => {
  const keyStr = localStorage.getItem("name-key");
  if (!keyStr) {
    return;
  }
  const key = new Uint8Array(JSON.parse(keyStr));

  const name = await Name.from(key);
  const revition = await Name.resolve(name);
  console.log(revition);
  return revition.value;
};
