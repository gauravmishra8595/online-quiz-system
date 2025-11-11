const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Question = require('../models/Question');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/online_quiz_db';

const categories = [
  { title: 'Data Structures', slug: 'data-structures', color: 'bg-indigo-500' },
  { title: 'Algorithms', slug: 'algorithms', color: 'bg-rose-500' },
  { title: 'Operating Systems', slug: 'operating-systems', color: 'bg-green-600' },
  { title: 'DBMS', slug: 'dbms', color: 'bg-yellow-500' },
  { title: 'Computer Networks', slug: 'computer-networks', color: 'bg-sky-500' }
];


const qs = {
  'data-structures': [
    { text: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctIndex: 1 },
    { text: 'Which is balanced tree?', options: ['BST', 'AVL', 'Hash', 'Stack'], correctIndex: 1 },
    { text: 'DS used for LRU?', options: ['Array', 'LinkedList+Hash', 'Tree', 'Stack'], correctIndex: 1 },
    { text: 'Which supports random access?', options: ['LinkedList', 'Array', 'Queue', 'Stack'], correctIndex: 1 },
    { text: 'Push operation for stack is O( )', options: ['1', 'n', 'log n', 'n log n'], correctIndex: 0 },
    { text: 'Which structure uses nodes and edges?', options: ['Tree', 'Queue', 'Graph', 'Array'], correctIndex: 2 },
    { text: 'Which is LIFO?', options: ['Queue', 'Stack', 'Hash', 'Graph'], correctIndex: 1 },
    { text: 'Which is good for priority scheduling?', options: ['Queue', 'Heap', 'Array', 'Stack'], correctIndex: 1 },
    { text: 'Which is not linear DS?', options: ['Array', 'LinkedList', 'Tree', 'Stack'], correctIndex: 2 },
    { text: 'Which DS is used in recursion?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctIndex: 1 }
  ],
  'algorithms': [
    { text: 'Big O of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctIndex: 1 },
    { text: 'Which is divide and conquer?', options: ['MergeSort', 'BubbleSort', 'InsertionSort', 'LinearSearch'], correctIndex: 0 },
    { text: 'Dijkstra finds?', options: ['MST', 'SSSP', 'All pairs shortest', 'Topological order'], correctIndex: 1 },
    { text: 'Greedy algorithm example?', options: ['Knapsack (0/1)', 'Huffman coding', 'MergeSort', 'DFS'], correctIndex: 1 },
    { text: 'Which sorts in-place?', options: ['MergeSort', 'QuickSort', 'CountingSort', 'RadixSort'], correctIndex: 1 },
    { text: 'Complexity of QuickSort average?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], correctIndex: 1 },
    { text: 'Topological sort for?', options: ['Graph cycles', 'DAG', 'Weighted graph', 'Tree'], correctIndex: 1 },
    { text: 'Which algorithm uses DP?', options: ['Floyd-Warshall', 'Binary Search', 'BFS', 'DFS'], correctIndex: 0 },
    { text: 'Backtracking used in?', options: ['Knapsack', 'N-Queens', 'Dijkstra', 'Heapify'], correctIndex: 1 },
    { text: 'Minimax used in?', options: ['Compilers', 'AI Game playing', 'Databases', 'Networking'], correctIndex: 1 }
  ],
  'operating-systems': [
    { text: 'Which is a process state?', options: ['Sleeping', 'Running', 'Waiting', 'All'], correctIndex: 3 },
    { text: 'Which scheduling is preemptive?', options: ['FCFS', 'Round Robin', 'SJF non-preemptive', 'None'], correctIndex: 1 },
    { text: 'Virtual memory means?', options: ['Swap only', 'Address space larger than RAM', 'No paging', 'None'], correctIndex: 1 },
    { text: 'Mutex is used for?', options: ['I/O', 'Mutual exclusion', 'Scheduling', 'Paging'], correctIndex: 1 },
    { text: 'Page replacement example?', options: ['FIFO', 'LRU', 'Optimal', 'All'], correctIndex: 3 },
    { text: 'Context switch cost?', options: ['Low', 'High', 'Zero', 'None'], correctIndex: 1 },
    { text: 'Deadlock prevention includes?', options: ['Preemption', 'Hold and Wait', 'Mutual Exclusion', 'None'], correctIndex: 0 },
    { text: 'Kernel mode has?', options: ['More privileges', 'Less privileges', 'Same', 'None'], correctIndex: 0 },
    { text: 'Interrupt handling is', options: ['Synchronous', 'Asynchronous', 'Neither', 'Both'], correctIndex: 1 },
    { text: 'Spooling stands for?', options: ['Simultaneous peripheral operations on-line', 'Single process on line', 'None', 'Both'], correctIndex: 0 }
  ],
  'dbms': [
    { text: 'ACID stands for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Auto, Consistent, Isolated, Durable', 'None', 'All'], correctIndex: 0 },
    { text: 'Normal form to remove transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 2 },
    { text: 'Primary key must be?', options: ['Unique', 'Null', 'Duplicate', 'None'], correctIndex: 0 },
    { text: 'Index helps in?', options: ['Faster search', 'Slower search', 'No effect', 'Delete'], correctIndex: 0 },
    { text: 'Join that returns matching rows?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], correctIndex: 0 },
    { text: 'Normalization reduces?', options: ['Redundancy', 'Speed', 'Space', 'None'], correctIndex: 0 },
    { text: 'SQL stands for?', options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'None'], correctIndex: 0 },
    { text: 'Which is a NoSQL DB?', options: ['MongoDB', 'MySQL', 'Oracle', 'Postgres'], correctIndex: 0 },
    { text: 'ACID property related to durability?', options: ['Yes', 'No', 'Maybe', 'None'], correctIndex: 0 },
    { text: 'Transaction is?', options: ['Atomic unit of work', 'Single query', 'Table', 'None'], correctIndex: 0 }
  ],
  'computer-networks': [
    { text: 'OSI layer for routing?', options: ['Application', 'Transport', 'Network', 'Data Link'], correctIndex: 2 },
    { text: 'TCP is?', options: ['Connectionless', 'Connection-oriented', 'Unreliable', 'None'], correctIndex: 1 },
    { text: 'HTTP uses which port by default?', options: ['80', '21', '22', '25'], correctIndex: 0 },
    { text: 'LAN stands for?', options: ['Large Area Network', 'Local Area Network', 'Long Area Network', 'Low Area Network'], correctIndex: 1 },
    { text: 'Which device works at layer 2?', options: ['Router', 'Switch', 'Hub', 'Gateway'], correctIndex: 1 },
    { text: 'UDP provides?', options: ['Reliable', 'Unreliable', 'Ordered', 'Connection-oriented'], correctIndex: 1 },
    { text: 'IP address v4 is how many bits?', options: ['32', '64', '128', '16'], correctIndex: 0 },
    { text: 'Ping uses which protocol?', options: ['TCP', 'ICMP', 'UDP', 'HTTP'], correctIndex: 1 },
    { text: 'DNS resolves?', options: ['IP to Domain', 'Domain to IP', 'Both', 'None'], correctIndex: 1 },
    { text: 'Subnet mask separates?', options: ['Network and Host', 'Transport and Network', 'Application and Presentation', 'None'], correctIndex: 0 }
  ]
};

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Mongo for seeding');
    await Category.deleteMany({});
    await Question.deleteMany({});

    for (const cat of categories) {
      const c = new Category(cat);
      await c.save();
      const list = qs[cat.slug] || [];
      for (const q of list) {
        const qu = new Question({
          category: c._id,
          text: q.text,
          options: q.options,
          correctIndex: q.correctIndex
        });
        await qu.save();
      }
    }

    console.log('Seeding done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
