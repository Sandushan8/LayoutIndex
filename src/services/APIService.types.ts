export type UserProps = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export type GetAllUsersProps = {
  data: UserProps[];
  page: number;
  per_page: number;

  total: number;
  total_pages: number;
};

export type GetSingleUserProps = {
  data: UserProps;
};
