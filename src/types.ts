export interface Distribution {
  name: string;
  link: string;
}

export interface Subversion {
  subversionId: string;
  distributions: Distribution[];
}

export interface Modpack {
  id: string;
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
