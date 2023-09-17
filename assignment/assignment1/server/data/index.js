import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    username: "YanLing",
    password: "12345",
    isAdmin: false,
    picturePath: "",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    username: "Elizabeth",
    password: "67890",
    isAdmin: false,
    picturePath: "",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    username: "Nevin",
    password: "qwerty",
    isAdmin: false,
    picturePath: "",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    username: "JunJie",
    password: "asdfghjkl",
    isAdmin: false,
    picturePath: "",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[4],
    username: "Benny",
    password: "zxcvbnm",
    isAdmin: false,
    picturePath: "",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
];

export const questions = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Reverse a String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters s. \nYou must do this by modifying the input array in-place with O(1) extra memory.",
    tags: ["Strings", "Algorithms"],
    examples: ['Input: s = ["h","e","l","l","o"] \nOutput: ["o","l","l","e","h"]', 'Input: s = ["H","a","n","n","a","h"] \nOutput: ["h","a","n","n","a","H"]'],
    constraints: ['1 <= s.length <= 105', 's[i] is a printable ascii character.'],
    likes: 12,
    dislikes: 0,
    picturePath: "",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Linked List Cycle Detection",
    difficulty: "Easy",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it." 
      + "\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter." 
      + "\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.",
    tags: ["Data Structures", "Algorithms"],
    examples: ['Input: head = [3,2,0,-4], pos = 1 \nOutput: true \nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).', 
      'Input: head = [1,2], pos = 0 \nOutput: true \nExplanation: There is a cycle in the linked list, where the tail connects to the 0th node.'],
    constraints: ['The number of the nodes in the list is in the range [0, 104].', '-105 <= Node.val <= 105', 'pos is -1 or a valid index in the linked-list.'],
    likes: 5,
    dislikes: 0,
    picturePath: "",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Add Binary",
    difficulty: "Easy",
    description: "Given two binary strings a and b, return their sum as a binary string.",
    tags: ["Bit Manipulation", "Algorithms"],
    examples: ['Input: a = "11", b = "1" \nOutput: "100"', 'Input: a = "1010", b = "1011" \nOutput: "10101"'],
    constraints: ['1 <= a.length, b.length <= 104', "a and b consist only of '0' or '1' characters.", 'Each string does not contain leading zeros except for the zero itself.'],
    likes: 15,
    dislikes: 0,
    picturePath: "",
  },
];
