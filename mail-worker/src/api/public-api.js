import app from '../hono/hono';
import result from '../model/result';
import publicService from '../service/public-service';

import emailService from '../service/email-service';




app.post('/public/genToken', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});

app.post('/public/emailList', async (c) => {
	const list = await publicService.emailList(c, await c.req.json());
	return c.json(result.ok(list));
});

app.post('/public/addUser', async (c) => {
	await publicService.addUser(c, await c.req.json());
	return c.json(result.ok());
});

// 新增以下代码（物理删除邮件的公开API）
app.post('/public/physicsDeleteEmail', async (c) => {
	// app.post：注册HTTP POST路由，路径是/public/physicsDeleteEmail，和项目其他路由风格统一
	const params = await c.req.json();
	// 从请求体解析JSON，期望格式{"emailIds":"1,2,3"}
	const token = c.req.header('Authorization');
	// 从请求头获取Authorization字段
	if (!token) {		
		return c.json(result.fail("缺少Authorization头"));// 如果没有token则返回失败
	}
	// 调用物理删除函数，真正从数据库删除邮件记录、清理R2附件和star关联
	await emailService.physicsDelete(c, params);	
	return c.json(result.ok());// 返回成功响应
});
