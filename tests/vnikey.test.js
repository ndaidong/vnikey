// vnikey.test

const {
  isFunction,
} = require('bellajs');

const {fireEvent} = require('@testing-library/dom');

const vnikey = require('../dist/vnikey');

describe('Check vnikey APIs', () => {
  describe('Check publicMethods', () => {
    const publicMethods = [
      'init',
      'findReplacer',
    ];

    const check = (k) => {
      it(`vnikey.${k} must be defined`, () => {
        expect(vnikey[k]).toBeDefined();
      });
      it(`vnikey.${k} must be function`, () => {
        expect(isFunction(vnikey[k])).toBe(true);
      });
    };

    publicMethods.map(check);
  });
});

describe('Test how vnikey assign accents', () => {
  const cases = 'ba,bá,bà,bả,bã,bạ'.split(',');

  for (let i = 1; i < cases.length; i++) {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(i, cases[0], 2);
    it(`test result of vnikey.findReplacer(${i}, '${cases[0]}', ${2}):`, () => {
      expect(replacement).toBe(cases[i]);
      expect(newpos).toBe(2);
    });
  }

  it(`test result of vnikey.findReplacer(7, 'thuong', 6):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(7, 'thuong', 6);
    expect(replacement).toBe(`thương`);
    expect(newpos).toBe(6);
  });

  it(`test result of vnikey.findReplacer(3, 'thương', 6):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(3, 'thương', 6);
    expect(replacement).toBe(`thưởng`);
    expect(newpos).toBe(6);
  });

  it(`test result of vnikey.findReplacer(2, 'thưởng', 6):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'thưởng', 6);
    expect(replacement).toBe(`thường`);
    expect(newpos).toBe(6);
  });

  it(`test result of vnikey.findReplacer(3, 'thưởng', 6):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(3, 'thưởng', 6);
    expect(replacement).toBe(`thưởng3`);
    expect(newpos).toBe(7);
  });

  it(`test result of vnikey.findReplacer(2, 'xoan', 4):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'xoan', 4);
    expect(replacement).toBe(`xoàn`);
    expect(newpos).toBe(4);
  });


  it(`test result of vnikey.findReplacer(2, 'xoàn', 4):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'xoàn', 4);
    expect(replacement).toBe(`xoàn2`);
    expect(newpos).toBe(5);
  });


  it(`test result of vnikey.findReplacer(2, 'xoa', 3):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'xoa', 3);
    expect(replacement).toBe(`xòa`);
    expect(newpos).toBe(3);
  });

  it(`test result of vnikey.findReplacer(2, 'xoa', 3):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'xoa', 3);
    expect(replacement).toBe(`xòa`);
    expect(newpos).toBe(3);
  });

  it(`test result of vnikey.findReplacer(2, 'xòa', 3):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'xòa', 3);
    expect(replacement).toBe(`xòa2`);
    expect(newpos).toBe(4);
  });

  it(`test result of vnikey.findReplacer(3, 'khuyu', 5):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(3, 'khuyu', 5);
    expect(replacement).toBe(`khuỷu`);
    expect(newpos).toBe(5);
  });

  it(`test result of vnikey.findReplacer(3, 'tôi đang kiếm tra một chút', 12):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(3, 'tôi đang kiếm tra một chút', 12);
    expect(replacement).toBe(`tôi đang kiểm tra một chút`);
    expect(newpos).toBe(12);
  });
});

describe('Test how vnikey assign marks', () => {
  const vowels = [
    'aăâeêioôơuưy',
    'áắấéếíóốớúứý',
    'àằầèềìòồờùừỳ',
    'ảẳẩẻểỉỏổởủửỷ',
    'ãẵẫẽễĩõỗỡũữỹ',
    'ạặậẹệịọộợụựỵ',
  ];

  for (const row of vowels) {
    // key 8
    it(`test result of vnikey.findReplacer(8, '${row[0]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(8, row[0], 1);
      expect(replacement).toBe(row[1]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(8, '${row[2]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(8, row[2], 1);
      expect(replacement).toBe(row[1]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(8, '${row[5]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(8, row[5], 1);
      expect(replacement).toBe(`${row[5]}8`);
      expect(newpos).toBe(2);
    });

    // key 7
    it(`test result of vnikey.findReplacer(7, '${row[6]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(7, row[6], 1);
      expect(replacement).toBe(row[8]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(7, '${row[7]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(7, row[7], 1);
      expect(replacement).toBe(row[8]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(7, '${row[9]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(7, row[9], 1);
      expect(replacement).toBe(row[10]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(7, '${row[5]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(7, row[5], 1);
      expect(replacement).toBe(`${row[5]}7`);
      expect(newpos).toBe(2);
    });

    // key 6
    it(`test result of vnikey.findReplacer(6, '${row[0]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[0], 1);
      expect(replacement).toBe(row[2]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(6, '${row[1]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[1], 1);
      expect(replacement).toBe(row[2]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(6, '${row[3]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[3], 1);
      expect(replacement).toBe(row[4]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(6, '${row[6]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[6], 1);
      expect(replacement).toBe(row[7]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(6, '${row[8]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[8], 1);
      expect(replacement).toBe(row[7]);
      expect(newpos).toBe(1);
    });
    it(`test result of vnikey.findReplacer(6, '${row[5]}', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, row[5], 1);
      expect(replacement).toBe(`${row[5]}6`);
      expect(newpos).toBe(2);
    });
    it(`test result of vnikey.findReplacer(6, 'c', 1):`, () => {
      const {
        replacement,
        curpos: newpos,
      } = vnikey.findReplacer(6, 'c', 1);
      expect(replacement).toBe(`c6`);
      expect(newpos).toBe(2);
    });
  }
});

describe('Test how vnikey assign d/D --> đ/Đ', () => {
  it(`test result of vnikey.findReplacer(9, 'd', 1):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(9, 'd', 1);
    expect(replacement).toBe(`đ`);
    expect(newpos).toBe(1);
  });
  it(`test result of vnikey.findReplacer(9, 'D', 1):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(9, 'D', 1);
    expect(replacement).toBe(`Đ`);
    expect(newpos).toBe(1);
  });
  it(`test result of vnikey.findReplacer(9, 'TGDD', 5):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(9, 'TGDD', 4);
    expect(replacement).toBe(`TGDĐ`);
    expect(newpos).toBe(4);
  });
  it(`test result of vnikey.findReplacer(9, 'TGDD', 5):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(9, 'G', 1);
    expect(replacement).toBe(`G9`);
    expect(newpos).toBe(2);
  });
});

describe('Test how vnikey ignore english word', () => {
  it(`test result of vnikey.findReplacer(1, 'alter', 5):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(1, 'alter', 5);
    expect(replacement).toBe(`alter1`);
    expect(newpos).toBe(6);
  });
  it(`test result of vnikey.findReplacer(2, 'clean', 5):`, () => {
    const {
      replacement,
      curpos: newpos,
    } = vnikey.findReplacer(2, 'clean', 5);
    expect(replacement).toBe(`clean2`);
    expect(newpos).toBe(6);
  });
});


describe('Test how vnikey handle key event', () => {
  const textarea = document.createElement('textarea');
  it(`test result while pressing key 1:`, () => {
    document.body.appendChild(textarea);
    textarea.value = 'co';
    textarea.focus();
    fireEvent.keyPress(textarea, {key: 1, code: 'Digit1'});
    expect(textarea.value).toBe(`co`);
  });
});
