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
	const params = await c.req.json();
	// 该方法会删除数据库记录、R2附件和star关联
	await emailService.physicsDelete(c, params);
	// result.ok()：包装成功结果
	return c.json(result.ok());
});
