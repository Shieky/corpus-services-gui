import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #99c1f1
		'--color-primary-50': '240 246 253', // #f0f6fd
		'--color-primary-100': '235 243 252', // #ebf3fc
		'--color-primary-200': '230 240 252', // #e6f0fc
		'--color-primary-300': '214 230 249', // #d6e6f9
		'--color-primary-400': '184 212 245', // #b8d4f5
		'--color-primary-500': '153 193 241', // #99c1f1
		'--color-primary-600': '138 174 217', // #8aaed9
		'--color-primary-700': '115 145 181', // #7391b5
		'--color-primary-800': '92 116 145', // #5c7491
		'--color-primary-900': '75 95 118', // #4b5f76
		// secondary | #e01b24
		'--color-secondary-50': '250 221 222', // #faddde
		'--color-secondary-100': '249 209 211', // #f9d1d3
		'--color-secondary-200': '247 198 200', // #f7c6c8
		'--color-secondary-300': '243 164 167', // #f3a4a7
		'--color-secondary-400': '233 95 102', // #e95f66
		'--color-secondary-500': '224 27 36', // #e01b24
		'--color-secondary-600': '202 24 32', // #ca1820
		'--color-secondary-700': '168 20 27', // #a8141b
		'--color-secondary-800': '134 16 22', // #861016
		'--color-secondary-900': '110 13 18', // #6e0d12
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #073A62
		'--color-surface-50': '218 225 231', // #dae1e7
		'--color-surface-100': '205 216 224', // #cdd8e0
		'--color-surface-200': '193 206 216', // #c1ced8
		'--color-surface-300': '156 176 192', // #9cb0c0
		'--color-surface-400': '81 117 145', // #517591
		'--color-surface-500': '7 58 98', // #073A62
		'--color-surface-600': '6 52 88', // #063458
		'--color-surface-700': '5 44 74', // #052c4a
		'--color-surface-800': '4 35 59', // #04233b
		'--color-surface-900': '3 28 48' // #031c30
	}
};
