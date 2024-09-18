/**
 *  滑动窗口双指针
 *  https://leetcode.cn/problems/find-all-anagrams-in-a-string/solutions/9749/hua-dong-chuang-kou-tong-yong-si-xiang-jie-jue-zi-/
 */

// string minWindowDemo1(string s, string t) {
//     unordered_map<char, int> need, window;
//     for (char c : t) need[c]++;

//     int left = 0, right = 0;
//     int valid = 0;
//     // 记录最小覆盖子串的起始索引及长度
//     int start = 0, len = INT_MAX;
//     while (right < s.size()) {
//         // c 是将移入窗口的字符
//         char c = s[right];
//         // 右移窗口
//         right++;
//         // 进行窗口内数据的一系列更新
//         if (need.count(c)) {
//             window[c]++;
//             if (window[c] == need[c])
//                 valid++;
//         }

//         // 判断左侧窗口是否要收缩
//         while (valid == need.size()) {
//             // 在这里更新最小覆盖子串
//             if (right - left < len) {
//                 start = left;
//                 len = right - left;
//             }
//             // d 是将移出窗口的字符
//             char d = s[left];
//             // 左移窗口
//             left++;
//             // 进行窗口内数据的一系列更新
//             if (need.count(d)) {
//                 if (window[d] == need[d])
//                     valid--;
//                 window[d]--;
//             }
//         }
//     }
//     // 返回最小覆盖子串
//     return len == INT_MAX ?
//         "" : s.substr(start, len);
// }

// int lengthOfLongestSubstring(string s) {
//     unordered_map<char, int> window;

//     int left = 0, right = 0;
//     int res = 0; // 记录结果
//     while (right < s.size()) {
//         char c = s[right];
//         right++;
//         // 进行窗口内数据的一系列更新
//         window[c]++;
//         // 判断左侧窗口是否要收缩
//         while (window[c] > 1) {
//             char d = s[left];
//             left++;
//             // 进行窗口内数据的一系列更新
//             window[d]--;
//         }
//         // 在这里更新答案
//         res = max(res, right - left);
//     }
//     return res;
// }

function minContainer(s, b) {
  const needInfo = new Map();
  const windowInfo = new Map();
  for (let i = 0; i < b.length; i++) {
    let count = needInfo.get(b[i]) || 0;
    needInfo.set(b[i], count + 1);
  }
  console.log("needInfo", needInfo);

  let left = 0;
  let right = 0;
  let valid = 0;
  let start = 0;
  let len = Number.MAX_VALUE;

  while (right < s.length) {
    const c = s[right];
    right++;

    if (needInfo.has(c)) {
      let count = windowInfo.get(c) || 0;
      windowInfo.set(c, count + 1);
      if (count + 1 === needInfo.get(c)) {
        console.log("valid +++", windowInfo);
        valid++;
      }
    }

    while (valid === needInfo.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      const d = s[left];
      if (windowInfo.has(d)) {
        let count = windowInfo.get(d);
        if (count == needInfo.get(d)) {
          console.log("valid ---", windowInfo);
          valid--;
        }
        windowInfo.set(d, count - 1);
      }
      left++;
    }
  }
  return len === Number.MAX_VALUE ? "" : s.substr(start, len);
}

// const result = minContainer("eadddbc666caddde", "edddc");

// console.log("result：", result);

// vector<int> findAnagrams(string s, string t) {
//     unordered_map<char, int> need, window;
//     for (char c : t) need[c]++;

//     int left = 0, right = 0;
//     int valid = 0;
//     vector<int> res; // 记录结果
//     while (right < s.size()) {
//         char c = s[right];
//         right++;
//         // 进行窗口内数据的一系列更新
//         if (need.count(c)) {
//             window[c]++;
//             if (window[c] == need[c])
//                 valid++;
//         }
//         // 判断左侧窗口是否要收缩
//         while (right - left >= t.size()) {
//             // 当窗口符合条件时，把起始索引加入 res
//             if (valid == need.size())
//                 res.push_back(left);
//             char d = s[left];
//             left++;
//             // 进行窗口内数据的一系列更新
//             if (need.count(d)) {
//                 if (window[d] == need[d])
//                     valid--;
//                 window[d]--;
//             }
//         }
//     }
//     return res;
// }

function findAnagrams2(s, b) {
  const needInfo = new Map();
  const windowInfo = new Map();
  for (let i = 0; i < b.length; i++) {
    let count = needInfo.get(b[i]) || 0;
    needInfo.set(b[i], count + 1);
  }
  console.log("needInfo", needInfo);

  let left = 0;
  let right = 0;
  let valid = 0;
  const result = [];

  while (right < s.length) {
    const c = s[right];
    right++;

    if (needInfo.has(c)) {
      let count = windowInfo.get(c) || 0;
      windowInfo.set(c, count + 1);
      if (count + 1 === needInfo.get(c)) {
        console.log("valid +++", windowInfo);
        valid++;
      }
    }

    while (right - left >= b.length) {
      if (valid === needInfo.size) {
        result.push(s.substring(left, left + b.length));
      }
      const d = s[left];
      left++;
      if (needInfo.has(d)) {
        let count = windowInfo.get(d);
        if (count === needInfo.get(d)) {
          console.log("valid ---", windowInfo);
          valid--;
        }
        windowInfo.set(d, count - 1);
      }
    }
  }
  return result;
}

function findAnagrams(s, b) {
  const needInfo = new Map();
  const windowInfo = new Map();
  
  // 初始化需要的字符及其出现次数
  for (let char of b) {
    needInfo.set(char, (needInfo.get(char) || 0) + 1);
  }
  console.log("needInfo", needInfo);

  let left = 0;
  let right = 0;
  let valid = 0;
  const result = [];

  while (right < s.length) {
    const c = s[right];
    right++;

    if (needInfo.has(c)) {
      windowInfo.set(c, (windowInfo.get(c) || 0) + 1);
      
      if (windowInfo.get(c) === needInfo.get(c)) {
        console.log("valid +++", windowInfo);
        valid++;
      }
    }

    // 当窗口大小等于模式串长度时
    while (right - left >= b.length) {
      if (valid === needInfo.size) {
        result.push(s.substring(left, right));
      }

      const d = s[left];
      left++;

      if (needInfo.has(d)) {
        
        if (windowInfo.get(d) === needInfo.get(d)) {
          console.log("valid ---", windowInfo);
          valid--;
        }
        windowInfo.set(d, windowInfo.get(d) - 1);
      }
    }
  }
  return result;
}

const result = findAnagrams("ecadddbc666cddde777", "edddc");

console.log("result：", result);
