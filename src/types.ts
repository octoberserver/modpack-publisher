export interface Distribution {
  id: string;
  name: string;
  link: string;
}

export interface Subversion {
  id: string;
  sid: string;
  distributions: Distribution[];
}

export interface Modpack {
  id: string;
  mid: string;
  name: string;
  fullName: string;
  minecraftVersion: string;
  modpackLink: string;
  subversions: Subversion[];
}

export interface User {
  username: string;
  password: string;
}
